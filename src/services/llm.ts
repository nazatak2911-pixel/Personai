// LLM Service with OpenRouter (primary) + Gemini (fallback)
// Supports multiple free models with automatic fallback on rate limits

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const SYSTEM_PROMPT = `You are PERSONAI, a warm and knowledgeable AI career mentor designed specifically for young people aged 14-22. You were created by a team of students from Bilfen Private High Schools in 2026.

Your personality:
- Supportive, encouraging, and realistic
- Speaks clearly and avoids overly complex jargon
- Draws on knowledge of many career fields
- Helps users explore career paths, build CVs, understand job markets, and prepare for internships
- Occasionally shares inspiring (but realistic) perspectives on career journeys

Your capabilities:
- Career path exploration and advice
- CV/resume writing tips personalized to the user's background
- Internship hunting strategies
- Job simulation guidance (explaining what it's like to work in a field)
- Networking advice for young professionals
- Motivational support for students uncertain about their future

Keep responses concise (2-4 paragraphs max) unless asked for detail. Always be encouraging. Never give harmful advice.`;

// OpenRouter free models — tried in order
const OPENROUTER_MODELS = [
  'meta-llama/llama-3.1-8b-instruct:free',
  'mistralai/mistral-7b-instruct:free',
  'microsoft/phi-3-mini-128k-instruct:free',
  'google/gemma-2-9b-it:free',
];

async function callOpenRouter(
  messages: ChatMessage[],
  modelIndex = 0
): Promise<string> {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  if (!apiKey) throw new Error('NO_OPENROUTER_KEY');

  if (modelIndex >= OPENROUTER_MODELS.length) {
    throw new Error('ALL_OPENROUTER_MODELS_EXHAUSTED');
  }

  const model = OPENROUTER_MODELS[modelIndex];

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': window.location.origin,
      'X-Title': 'Personna AI',
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
      max_tokens: 512,
      temperature: 0.75,
    }),
  });

  if (response.status === 429 || response.status === 503) {
    // Rate limited or unavailable — try next model
    console.warn(`OpenRouter model ${model} unavailable, trying next...`);
    return callOpenRouter(messages, modelIndex + 1);
  }

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`OpenRouter error: ${response.status} ${err}`);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) throw new Error('Empty response from OpenRouter');
  return content.trim();
}

async function callGemini(messages: ChatMessage[]): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) throw new Error('NO_GEMINI_KEY');

  // Convert messages to Gemini format
  const geminiContents = messages.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.role === 'system' ? `[System Instructions]: ${m.content}` : m.content }],
  }));

  // Prepend system prompt as first user message if no system role support
  const contents = [
    { role: 'user', parts: [{ text: `[System Instructions]: ${SYSTEM_PROMPT}` }] },
    { role: 'model', parts: [{ text: 'Understood. I am PERSONAI, your AI career mentor. How can I help you today?' }] },
    ...geminiContents,
  ];

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        generationConfig: {
          maxOutputTokens: 512,
          temperature: 0.75,
        },
      }),
    }
  );

  if (response.status === 429) {
    throw new Error('GEMINI_RATE_LIMITED');
  }

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Gemini error: ${response.status} ${err}`);
  }

  const data = await response.json();
  const content = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!content) throw new Error('Empty response from Gemini');
  return content.trim();
}

export async function sendMessage(messages: ChatMessage[]): Promise<string> {
  // Try OpenRouter first (multiple free models), then Gemini as final fallback
  const errors: string[] = [];

  try {
    return await callOpenRouter(messages);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    if (msg !== 'NO_OPENROUTER_KEY') {
      errors.push(`OpenRouter: ${msg}`);
      console.error('OpenRouter failed:', msg);
    }
  }

  try {
    return await callGemini(messages);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    if (msg !== 'NO_GEMINI_KEY') {
      errors.push(`Gemini: ${msg}`);
      console.error('Gemini failed:', msg);
    }
  }

  // Both failed — check if it's a key issue
  const hasOpenRouter = !!import.meta.env.VITE_OPENROUTER_API_KEY;
  const hasGemini = !!import.meta.env.VITE_GEMINI_API_KEY;

  if (!hasOpenRouter && !hasGemini) {
    return "I'm not configured yet — no API keys have been set up. If you're the site owner, please add VITE_OPENROUTER_API_KEY or VITE_GEMINI_API_KEY to your environment variables. If you're a visitor, please check back soon!";
  }

  return "I'm having trouble connecting right now due to high demand on the AI servers. Please try again in a moment! Both our primary and backup AI systems are currently at capacity. We apologize for the inconvenience.";
}
