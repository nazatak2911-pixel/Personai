import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { evaluateSimulationResponse } from '../services/llm';

interface SimulationCase {
  id: string;
  role: string;
  situation: string;
  character: string;
  visualLabel: string;
  initialMessage: string;
  icon: string;
}

const CASES: SimulationCase[] = [
  {
    id: 'doctor',
    role: 'Medical Doctor',
    situation: 'A 45-year-old patient presents with recurring migraines and occasional loss of peripheral vision. Initial tests were inconclusive.',
    character: 'Patient (Mr. Henderson)',
    visualLabel: 'fMRI Scan Results',
    initialMessage: "Doctor, these headaches are becoming unbearable. I've started seeing shadows out of the corner of my eye. What's happening to me?",
    icon: '🩺'
  },
  {
    id: 'architect',
    role: 'Architect',
    situation: 'A client wants to build a modern, high-tech glass villa on a cliff edge with high wind loads and strict environmental regulations.',
    character: 'Client (Sarah)',
    visualLabel: 'Site Topography & Wind Map',
    initialMessage: "I want the whole house to be glass for the view, but the city says we need to be 'green' and the wind up here is crazy. Can we actually build this?",
    icon: '🏗️'
  },
  {
    id: 'developer',
    role: 'Software Engineer',
    situation: 'The company\'s primary API is suffering from a massive performance degradation. 30% of requests are timing out, and the database CPU is at 99%.',
    character: 'CTO (Mark)',
    visualLabel: 'System Monitor (Grafana)',
    initialMessage: "The site is dying. Every second it's down, we lose $500. Have you checked the read replicas or is it a bad deployment? Fix it now!",
    icon: '💻'
  },
  {
    id: 'lawyer',
    role: 'Criminal Lawyer',
    situation: 'Your client is accused of a white-collar crime. A key witness just changed their testimony, and the prosecution is offering a plea deal.',
    character: 'Client (James)',
    visualLabel: 'Witness Deposition Document',
    initialMessage: "They gave me a plea deal, but I'm innocent. If I take it, my career is over. If we go to trial and lose, I'm looking at 10 years. What do we do?",
    icon: '⚖️'
  }
];

const MyJobSimulations = () => {
  const { t } = useLanguage();
  const [selectedCase, setSelectedCase] = useState<SimulationCase | null>(null);
  const [userAction, setUserAction] = useState('');
  const [evaluation, setEvaluation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const startSimulation = (c: SimulationCase) => {
    setSelectedCase(c);
    setEvaluation(null);
    setUserAction('');
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
        <h1 style={{ fontSize: '3rem', fontWeight: '800', color: '#40e0d0', textTransform: 'uppercase', marginBottom: '30px' }}>
          {t.jobSimulations}
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.2rem', marginBottom: '40px' }}>Select a professional field to begin your immersive case simulation.</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {CASES.map(c => (
            <div 
              key={c.id} 
              onClick={() => startSimulation(c)}
              style={{ ...glassStyle, padding: '30px', cursor: 'pointer', transition: 'all 0.3s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}
              onMouseOver={e => { e.currentTarget.style.borderColor = '#40e0d0'; e.currentTarget.style.transform = 'translateY(-5px)'; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'; e.currentTarget.style.transform = 'none'; }}
            >
              <div style={{ fontSize: '3rem' }}>{c.icon}</div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#40e0d0', margin: 0 }}>{c.role}</h2>
              <button style={{ background: '#40e0d0', color: '#000', border: 'none', padding: '10px 24px', borderRadius: '50px', fontWeight: '700', cursor: 'pointer', marginTop: '10px' }}>
                Start Simulation
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
               <button 
                onClick={() => { setEvaluation(null); setUserAction(''); }}
                style={{ marginTop: '20px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.8rem' }}
               >
                 Try Different Response
               </button>
             </div>
           )}
        </div>

      </div>

    </div>
  );
};

export default MyJobSimulations;
