// LLM Service with Local Proxy to bypass CORS/Browser Blocks
export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const SYSTEM_PROMPT = `You are PERSONAI, a warm and knowledgeable AI career mentor designed for 14-22 year olds. Created by students from Bilfen Private High Schools in 2026.`;

// Try these free models
const OPENROUTER_MODELS = [
  'meta-llama/llama-3.1-8b-instruct:free',
  'mistralai/mistral-7b-instruct:free',
  'google/gemma-2-9b-it:free'
];

async function callOpenRouter(messages: ChatMessage[], modelIndex = 0): Promise<string> {
  const rawKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  const apiKey = (rawKey || '').replace(/["'“”]/g, '').trim();
  
  if (modelIndex >= OPENROUTER_MODELS.length) throw new Error('ALL_MODELS_BUSY');

  // Using LOCAL PROXY defined in vite.config.ts
  const response = await fetch('/api/openrouter', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'X-Title': 'Personna AI',
    },
    body: JSON.stringify({
      model: OPENROUTER_MODELS[modelIndex],
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    // Show more of the error for debugging
    throw new Error(`OPENROUTER_${response.status}_${err}`);
  }

  const data = await response.json();
  return data?.choices?.[0]?.message?.content || 'No response';
}

async function callGemini(messages: ChatMessage[]): Promise<string> {
  const rawKey = import.meta.env.VITE_GEMINI_API_KEY;
  const apiKey = (rawKey || '').replace(/["'“”]/g, '').trim();

  // Using LOCAL PROXY defined in vite.config.ts
  const response = await fetch('/api/gemini', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'x-goog-api-key': apiKey 
    },
    body: JSON.stringify({
      contents: [
        { role: 'user', parts: [{ text: `[System]: ${SYSTEM_PROMPT}` }] },
        ...messages.map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        }))
      ]
    }),
  });

  if (!response.ok) throw new Error(`GEMINI_${response.status}`);

  const data = await response.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
}

export async function sendMessage(messages: ChatMessage[]): Promise<string> {
  try {
    return await callOpenRouter(messages);
  } catch (e: any) {
    console.error('Proxy Error:', e.message);
    try {
      return await callGemini(messages);
    } catch (ge: any) {
      return `Connection issue. Please ensure your .env keys are valid and you've RESTARTED your terminal with: node_modules\\.bin\\vite. (Error: ${e.message})`;
    }
  }
}
