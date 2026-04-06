import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { evaluateSimulationResponse, sendMessage } from '../services/llm';

interface SimulationCase {
  id: string;
  role: string;
  situation: string;
  character: string;
  visualLabel: string;
  initialMessage: string;
  icon: string;
}

const MyJobSimulations = () => {
  const { t } = useLanguage();

  const [selectedCase, setSelectedCase] = useState<SimulationCase | null>(null);
  const [userAction, setUserAction] = useState('');
  const [evaluation, setEvaluation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentProfession, setCurrentProfession] = useState<string | null>(null);

  const generateCase = async (profession: string) => {
    setIsGenerating(true);
    setCurrentProfession(profession);
    setEvaluation(null);
    setUserAction('');

    const prompt = `Generate a highly detailed and professional job simulation case for the role of ${profession} in the language with code "${t.logIn === 'Giriş Yap' ? 'tr' : 'en'}".
    The case should be complex and include technical details (e.g., if doctor: vitals, lab results; if developer: error logs, system metrics).
    
    Respond ONLY with a JSON object in this exact format (no other text, no markdown code blocks like \`\`\`json):
    {
      "role": "${profession}",
      "situation": "Extremely detailed professional context and situation background (vitals, technical data, constraints).",
      "character": "The name or title of the person the user is interacting with.",
      "visualLabel": "A short title for what a visual feed would show (e.g., 'fMRI Scan' or 'Cloud Metrics').",
      "initialMessage": "The very first sentence this character says to the user to start the interaction."
    }`;

    try {
      const response = await sendMessage([{ role: 'user', content: prompt }]);
      const clean = response.trim().replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(clean);
      
      const newCase: SimulationCase = {
        id: Date.now().toString(),
        role: parsed.role,
        situation: parsed.situation,
        character: parsed.character,
        visualLabel: parsed.visualLabel,
        initialMessage: parsed.initialMessage,
        icon: profession === 'Doctor' ? '🩺' : profession === 'Architect' ? '🏗️' : profession === 'Software Engineer' ? '💻' : '⚖️'
      };
      
      setSelectedCase(newCase);
    } catch (err) {
      console.error("Case generation failed:", err);
      alert("AI was unable to generate this case. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleNextCase = () => {
    if (currentProfession) generateCase(currentProfession);
  };

  const handleVRClick = () => {
    alert("⚠️ Unfortunately, VR Adaptation is currently in Beta and not yet available for this simulation. We are working on 3D environment support! 🥽");
  };

  const handleEvaluate = async () => {
    if (!userAction.trim() || !selectedCase) return;
    setIsLoading(true);
    try {
      const result = await evaluateSimulationResponse(selectedCase.role, selectedCase.situation, userAction);
      setEvaluation(result);
    } catch {
      alert("Evaluation failed. Please try again.");
    }
    setIsLoading(false);
  };

  const speakBrief = () => {
    if (!selectedCase) return;
    const utterance = new SpeechSynthesisUtterance(selectedCase.initialMessage);
    window.speechSynthesis.speak(utterance);
  };

  const startVoiceCapture = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Your browser does not support Speech Recognition.");
    const recognition = new SpeechRecognition();
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setUserAction(prev => prev + (prev ? " " : "") + transcript);
    };
    recognition.start();
  };

  const glassStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '24px',
  };

  if (!selectedCase) {
    return (
      <div style={{ width: '100%', height: '100%', overflowY: 'auto', padding: '40px', color: '#fff' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '800', color: '#40e0d0', textTransform: 'uppercase', marginBottom: '10px' }}>
          {t.jobSimulations}
        </h1>
        <p style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.9rem', marginBottom: '30px', fontStyle: 'italic' }}>
          {t.simDisclaimer}
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {[
            { id: 'Doctor', icon: '🩺' },
            { id: 'Architect', icon: '🏗️' },
            { id: 'Software Engineer', icon: '💻' },
            { id: 'Lawyer', icon: '⚖️' }
          ].map(cat => (
            <div 
              key={cat.id} 
              onClick={() => !isGenerating && generateCase(cat.id)}
              style={{ 
                ...glassStyle, padding: '40px', cursor: isGenerating ? 'wait' : 'pointer', transition: 'all 0.3s', 
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px',
                opacity: isGenerating ? 0.6 : 1, position: 'relative'
              }}
              onMouseOver={e => { if (!isGenerating) { e.currentTarget.style.borderColor = '#40e0d0'; e.currentTarget.style.transform = 'translateY(-5px)'; } }}
              onMouseOut={e => { if (!isGenerating) { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; e.currentTarget.style.transform = 'none'; } }}
            >
              {isGenerating && currentProfession === cat.id && (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.4)', borderRadius: '24px' }}>
                  <div style={{ color: '#40e0d0', fontWeight: 'bold' }}>📡 Generating...</div>
                </div>
              )}
              <div style={{ fontSize: '4rem' }}>{cat.icon}</div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#40e0d0', margin: 0 }}>{cat.id}</h2>
              <button style={{ background: '#40e0d0', color: '#000', border: 'none', padding: '12px 30px', borderRadius: '50px', fontWeight: '700', cursor: 'pointer', marginTop: '10px' }}>
                Generate Case
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }



  return (
    <div style={{ width: '100%', height: '100%', overflowY: 'auto', padding: '40px', color: '#fff', position: 'relative' }}>
      
      {/* HEADER & VR BUTTON */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <button onClick={() => setSelectedCase(null)} style={{ background: 'transparent', border: 'none', color: '#40e0d0', cursor: 'pointer', fontSize: '0.9rem', marginBottom: '10px', display: 'block' }}>← Back to Selection</button>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#fff', textTransform: 'uppercase', margin: 0 }}>
             {selectedCase.role} Simulation
          </h1>
        </div>
        <button 
          onClick={handleVRClick}
          style={{ background: 'linear-gradient(135deg,#a78bfa,#7c3aed)', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '50px', cursor: 'pointer', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 15px rgba(124, 58, 237, 0.3)' }}
        >
          🥽 Adapt to VR
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '30px' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
          {/* VISUALIZER PLACEHOLDER */}
          <div style={{ 
            ...glassStyle, height: '400px', position: 'relative', overflow: 'hidden', 
            background: 'linear-gradient(45deg, rgba(30,30,30,0.8), rgba(10,10,10,0.9))',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
          }}>
            <div style={{ position: 'absolute', top: '15px', left: '20px', fontSize: '0.75rem', color: '#40e0d0', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
              LIVE FEED: {selectedCase.visualLabel}
            </div>
            
            <div style={{ textAlign: 'center', background: 'rgba(0,0,0,0.4)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '10px' }}>📸</div>
              <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.9rem' }}>Unfortunately, Visual Data is currently unavailable for this demo simulation.</div>
              <div style={{ color: '#40e0d0', fontSize: '0.8rem', marginTop: '5px' }}>Analyzing situational variables via text feedback instead...</div>
            </div>
          </div>

          {/* CHATBOT / CASE BRIEF */}
          <div style={{ ...glassStyle, padding: '30px', display: 'flex', gap: '20px' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#40e0d0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>👤</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ fontSize: '0.8rem', color: '#40e0d0', fontWeight: '700', textTransform: 'uppercase' }}>{selectedCase.character} says:</div>
                <button 
                  onClick={speakBrief}
                  style={{ background: 'rgba(64, 224, 208, 0.1)', border: '1px solid #40e0d0', color: '#40e0d0', borderRadius: '50px', padding: '4px 12px', cursor: 'pointer', fontSize: '0.75rem' }}
                >
                  🔊 Read Aloud
                </button>
              </div>
              <p style={{ fontSize: '1.3rem', lineHeight: '1.5', fontStyle: 'italic', color: '#eee', margin: 0 }}>"{selectedCase.initialMessage}"</p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)' }}>👂 Listening for response...</span>
              </div>
            </div>
          </div>
        </div>

        {/* RESPONSE & EVALUATION AREA */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
           <div style={{ ...glassStyle, padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#40e0d0', textTransform: 'uppercase' }}>Your Action/Decision</h3>
                <button 
                  onClick={startVoiceCapture}
                  style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', borderRadius: '50px', padding: '6px 14px', cursor: 'pointer', fontSize: '0.85rem' }}
                >
                  🎤 Voice Input
                </button>
              </div>
              <textarea 
                value={userAction}
                onChange={e => setUserAction(e.target.value)}
                placeholder="What is your professional advice or action in this situation? (e.g. 'I would order an urgent MRI with contrast...')"
                style={{ width: '100%', height: '200px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '16px', color: '#fff', fontSize: '1rem', outline: 'none', resize: 'none' }}
              />
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={handleEvaluate} 
                  disabled={isLoading || !userAction.trim()}
                  style={{ flex: 1, background: isLoading ? '#555' : 'linear-gradient(135deg,#40e0d0,#2a9d8f)', color: isLoading ? '#888' : '#000', border: 'none', padding: '12px', borderRadius: '12px', fontWeight: '700', cursor: isLoading ? 'not-allowed' : 'pointer' }}
                >
                  {isLoading ? '🤖 AI Evaluating...' : '📡 Send Decision for Evaluation'}
                </button>
              </div>
           </div>

           {evaluation && (
             <div style={{ ...glassStyle, padding: '30px', border: '1px solid rgba(64, 224, 208, 0.3)', background: 'rgba(64, 224, 208, 0.05)' }}>
               <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#40e0d0', textTransform: 'uppercase', marginBottom: '15px' }}>💡 Mentor Feedback</h3>
               <div style={{ color: '#eee', lineHeight: '1.6', fontSize: '0.95rem', whiteSpace: 'pre-wrap' }}>
                 {evaluation}
               </div>
               <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                 <button 
                  onClick={() => { setEvaluation(null); setUserAction(''); }}
                  style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem' }}
                 >
                   Try Different Response
                 </button>
                 <button 
                  onClick={handleNextCase}
                  style={{ background: '#40e0d0', border: 'none', color: '#000', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '800' }}
                 >
                   Next Case ➔
                 </button>
               </div>
             </div>
           )}
        </div>

      </div>

    </div>
  );
};

export default MyJobSimulations;
