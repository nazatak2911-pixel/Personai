// LLM Service with Local Proxy to bypass CORS/Browser Blocks
export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const SYSTEM_PROMPT = `You are PERSONAI, a warm and knowledgeable AI career mentor designed for 14-22 year olds. Created by students from Bilfen Private High Schools in 2026.`;

// Using highly stable free models
const OPENROUTER_MODELS = [
  'google/gemma-2-9b-it:free',
  'mistralai/mistral-7b-instruct:free',
  'meta-llama/llama-3-8b-instruct:free',
  'microsoft/phi-3-mini-128k-instruct:free'
];

async function callOpenRouter(messages: ChatMessage[], modelIndex = 0): Promise<string> {
  const rawKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  const apiKey = (rawKey || '').replace(/["'“”]/g, '').trim();
  
  if (!apiKey) throw new Error('NO_KEY_FOUND_IN_VITE');
  if (modelIndex >= OPENROUTER_MODELS.length) throw new Error('ALL_FREE_MODELS_BUSY');

  const model = OPENROUTER_MODELS[modelIndex];

  try {
    const response = await fetch('/api/openrouter', {
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
      }),
    });

    if (response.status === 404) {
      const errText = await response.text();
      if (errText.includes('No endpoints found')) {
        console.warn(`Model ${model} missing providers, trying next...`);
        return callOpenRouter(messages, modelIndex + 1);
      }
      throw new Error(`404: Check Privacy Settings on OpenRouter.ai (Data Sharing must be ON)`);
    }

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`OPENROUTER_${response.status}_${err.substring(0, 50)}`);
    }

    const data = await response.json();
    return data?.choices?.[0]?.message?.content || 'No response';
  } catch (e: any) {
    if (modelIndex < OPENROUTER_MODELS.length - 1) {
      return callOpenRouter(messages, modelIndex + 1);
    }
    throw e;
  }
}

async function callGemini(messages: ChatMessage[]): Promise<string> {
  const rawKey = import.meta.env.VITE_GEMINI_API_KEY;
  const apiKey = (rawKey || '').replace(/["'“”]/g, '').trim();

  if (!apiKey) throw new Error('NO_KEY_FOUND_IN_VITE');

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
    console.error('Core Error:', e.message);
    try {
      return await callGemini(messages);
    } catch (ge: any) {
      return `Connection issue.
      
      💡 FIX: Go to OpenRouter.ai > Settings > Privacy and ensure "Zero Data Retention" is OFF and "Data Sharing" is ON.
      
      (Error Details: ${e.message})`;
    }
  }
}
