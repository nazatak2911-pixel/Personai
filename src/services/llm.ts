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
      return `❌ Bağlantı Kesildi!\n      \n      📍 Anahtar Okundu mu?: ${hasOR || hasGM ? 'EVET ✅' : 'HAYIR ❌'}\n      📍 Hata Kodları: ${ge.message} | ${e.message}\n      \n      Çözüm önerisi: Lütfen terminali DURDURUP "node node_modules\\\\vite\\\\bin\\\\vite.js" komutuyla BAŞTAN BAŞLAT! (Vite bazen ayarları hafızasında eski haliyle tutuyor). ✨🚀`;
    }
  }
}

// Content moderation — returns safe:true or safe:false with a reason
export async function moderateContent(text: string): Promise<{ safe: boolean; reason?: string }> {
  const prompt = `You are a strict content moderation AI. Analyze the following user-submitted text for: sexual content, harassment, hate speech, violence, offensive language, or spam.

Text to analyze:
"${text}"

Respond with ONLY a JSON object like:
{"safe": true} 
or
{"safe": false, "reason": "Brief reason (max 15 words)"}

No other text, just the JSON.`;

  try {
    const messages: ChatMessage[] = [{ role: 'user', content: prompt }];
    const result = await sendMessage(messages);
    const clean = result.trim().replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(clean);
    return parsed;
  } catch {
    // If moderation fails, allow by default to not block legitimate users
    return { safe: true };
  }
}

// AI CV Enhancement
export async function enhanceCVWithAI(currentCV: string, request: string, targetPosition: string): Promise<string> {
  const prompt = `You are an expert CV writer. The user has a CV and wants to enhance it with AI.

Current CV summary/content:
${currentCV || '(No CV yet — this is a new CV)'}

User's request: "${request}"
Target position: "${targetPosition}"

Write a professional, polished enhancement/addition for their CV based on their request. Format it as formal CV content (1-3 paragraphs max). Do not add fake credentials or experiences — work with what they provide. Respond only with the enhanced CV text, no meta-commentary.`;

  const messages: ChatMessage[] = [{ role: 'user', content: prompt }];
  return await sendMessage(messages);
}

