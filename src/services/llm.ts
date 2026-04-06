// LLM Service: The "Final Promise" Fix
export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const SYSTEM_PROMPT = `You are PERSONAI, a career mentor.`;

async function callOpenRouter(messages: ChatMessage[], modelIndex = 0): Promise<string> {
  const models = ['google/gemma-2-9b-it:free', 'mistralai/mistral-7b-instruct:free', 'openrouter/auto'];
  const rawKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  const apiKey = (rawKey || '').replace(/["'“”]/g, '').trim();
  
  if (!apiKey || apiKey === 'your_openrouter_key_here') throw new Error('ANAHTAR_YOK');
  if (modelIndex >= models.length) throw new Error('MODELS_BUSY');

  const model = models[modelIndex];

  try {
    const response = await fetch('/api/openrouter', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model, messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages] }),
    });

    if (!response.ok) {
      const err = await response.text();
      // If we get an error, try the next model
      if (modelIndex < models.length - 1) return callOpenRouter(messages, modelIndex + 1);
      throw new Error(`OR_${response.status}_${err}`);
    }

    const data = await response.json();
    return data?.choices?.[0]?.message?.content || 'No response';
  } catch (e: any) {
    if (modelIndex < models.length - 1) return callOpenRouter(messages, modelIndex + 1);
    throw e;
  }
}

async function callGemini(messages: ChatMessage[]): Promise<string> {
  const rawKey = import.meta.env.VITE_GEMINI_API_KEY;
  const apiKey = (rawKey || '').replace(/["'“”]/g, '').trim();
  if (!apiKey || apiKey === 'your_gemini_key_here') throw new Error('ANAHTAR_YOK');

  // Alternating roles fix for Gemini (User -> Model -> User -> Model)
  const contents = [
    { role: 'user', parts: [{ text: `[System]: ${SYSTEM_PROMPT}` }] },
    { role: 'model', parts: [{ text: 'Anlaşıldı.' }] },
    ...messages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }))
  ];

  const response = await fetch('/api/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
    body: JSON.stringify({ contents, generationConfig: { maxOutputTokens: 512 } }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`GEMINI_${response.status}_${err}`);
  }
  const data = await response.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
}

export async function sendMessage(messages: ChatMessage[]): Promise<string> {
  const hasOR = !!import.meta.env.VITE_OPENROUTER_API_KEY && import.meta.env.VITE_OPENROUTER_API_KEY !== 'your_openrouter_key_here';
  const hasGM = !!import.meta.env.VITE_GEMINI_API_KEY && import.meta.env.VITE_GEMINI_API_KEY !== 'your_gemini_key_here';

  try {
    return await callGemini(messages);
  } catch (ge: any) {
    try {
      return await callOpenRouter(messages);
    } catch (e: any) {
      return `❌ Bağlantı Kesildi!
      
      📍 Anahtar Okundu mu?: ${hasOR || hasGM ? 'EVET ✅' : 'HAYIR ❌'}
      📍 Hata Kodları: ${ge.message} | ${e.message}
      
      Çözüm önerisi: Lütfen terminali DURDURUP "node node_modules\\vite\\bin\\vite.js" komutuyla BAŞTAN BAŞLAT! (Vite bazen ayarları hafızasında eski haliyle tutuyor). ✨🚀`;
    }
  }
}
