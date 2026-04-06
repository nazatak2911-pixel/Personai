// LLM Service: Unified AI Interface
export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const SYSTEM_PROMPT = `You are PERSONAI, a warm and knowledgeable AI career mentor.`;

const OPENROUTER_MODELS = [
  'google/gemma-2-9b-it:free',
  'mistralai/mistral-7b-instruct:free',
  'meta-llama/llama-3-8b-instruct:free'
];

async function callOpenRouter(messages: ChatMessage[], modelIndex = 0): Promise<string> {
  const rawKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  const apiKey = (rawKey || '').replace(/["'“”]/g, '').trim();
  if (!apiKey) throw new Error('NO_KEY');
  
  if (modelIndex >= OPENROUTER_MODELS.length) throw new Error('PRIVACY_SETTINGS_OR_MODELS_DOWN');

  const model = OPENROUTER_MODELS[modelIndex];
  
  try {
    // Try proxy first
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
      }),
    });

    if (response.status === 404 || response.status === 400) {
      return callOpenRouter(messages, modelIndex + 1);
    }

    if (!response.ok) throw new Error(`OR_${response.status}`);

    const data = await response.json();
    return data?.choices?.[0]?.message?.content || 'No response';
  } catch (e) {
    if (modelIndex < OPENROUTER_MODELS.length - 1) return callOpenRouter(messages, modelIndex + 1);
    throw e;
  }
}

async function callGemini(messages: ChatMessage[]): Promise<string> {
  const rawKey = import.meta.env.VITE_GEMINI_API_KEY;
  const apiKey = (rawKey || '').replace(/["'“”]/g, '').trim();
  if (!apiKey) throw new Error('NO_KEY');

  // Direct fetch as fallback if proxy fails
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
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

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`GEMINI_${response.status}_${err.substring(0, 20)}`);
  }

  const data = await response.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
}

export async function sendMessage(messages: ChatMessage[]): Promise<string> {
  try {
    // Attempt Gemini first since it's often more stable for direct CORS calls
    return await callGemini(messages);
  } catch (ge: any) {
    console.warn('Gemini failed, trying OpenRouter...', ge.message);
    try {
      return await callOpenRouter(messages);
    } catch (e: any) {
      return `Hata: Bağlantı kurulamadı. 
      
      Çözüm: OpenRouter.ai sitesine git, 'Privacy' ayarlarından 'Zero Data Retention' seçeneğini KAPAT. 
      
      (Gemini Hatası: ${ge.message})`;
    }
  }
}
