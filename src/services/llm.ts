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
  const rawApiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  const apiKey = (rawApiKey || '').replace(/["'“”]/g, '').trim();
  const url = 'https://openrouter.ai/api/v1/chat/completions';

  if (!apiKey) {
    throw new Error('NO_KEY_FOUND_IN_VITE');
  }

  if (modelIndex >= OPENROUTER_MODELS.length) {
    throw new Error('ALL_OPENROUTER_MODELS_EXHAUSTED');
  }

  const model = OPENROUTER_MODELS[modelIndex];
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'X-Title': 'Personna AI',
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
      max_tokens: 512,
      temperature: 0.75,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`OPENROUTER_ERROR_${response.status}_KEY_${apiKey.substring(0, 7)}`);
  }

  const data = await response.json();
  return data?.choices?.[0]?.message?.content?.trim() || 'No response';
}

async function callGemini(messages: ChatMessage[]): Promise<string> {
  const rawApiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const apiKey = (rawApiKey || '').replace(/["'“”]/g, '').trim();
  
  // Using v1beta for better model compatibility
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  if (!apiKey) {
    throw new Error('NO_KEY_FOUND_IN_VITE');
  }

  const geminiContents = messages.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.role === 'system' ? `[System Instructions]: ${m.content}` : m.content }],
  }));

  const contents = [
    { role: 'user', parts: [{ text: `[System Instructions]: ${SYSTEM_PROMPT}` }] },
    { role: 'model', parts: [{ text: 'Understood.' }] },
    ...geminiContents,
  ];

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents,
      generationConfig: { maxOutputTokens: 512, temperature: 0.75 },
    }),
  });

  if (!response.ok) {
    throw new Error(`GEMINI_ERROR_${response.status}_KEY_${apiKey.substring(0, 7)}`);
  }

  const data = await response.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || 'No response';
}

export async function sendMessage(messages: ChatMessage[]): Promise<string> {
  const errors: string[] = [];

  try {
    return await callOpenRouter(messages);
  } catch (e: any) {
    errors.push(e.message || 'OpenRouter Unknown');
  }

  try {
    return await callGemini(messages);
  } catch (e: any) {
    errors.push(e.message || 'Gemini Unknown');
  }

  return `Connection Failed. 
  Details: ${errors.join(' | ')}.
  
  💡 QUICK FIX:
  1. If it says KEY_... followed by nothing, your keys aren't being read. 
  2. Restart your terminal with "node_modules\\.bin\\vite" to reload the .env file!`;
}
