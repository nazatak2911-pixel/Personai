import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { generateSimulationCase, evaluateSimulationResponse, SimulationCase } from '../services/llm';

interface ActiveSimulation extends SimulationCase {
  id: string;
  role: string;
  icon: string;
  imageUrl?: string;
}

const MyJobSimulations = () => {
  const { t, language } = useLanguage();

  const [selectedCase, setSelectedCase] = useState<ActiveSimulation | null>(null);
  const [userAction, setUserAction] = useState('');
  const [evaluation, setEvaluation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentProfession, setCurrentProfession] = useState<string | null>(null);
  const [feedStatus, setFeedStatus] = useState(t.systemReady);

  // Simulated live feed status updates
  useEffect(() => {
    if (selectedCase && !evaluation) {
      const statuses = [t.signalStable, t.analyzingInput, t.biometricsNominal, t.envSynced, t.aiMonitoring];
      const interval = setInterval(() => {
        setFeedStatus(statuses[Math.floor(Math.random() * statuses.length)]);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [selectedCase, evaluation]);

  const professions = [
    { id: 'Doctor', icon: '🩺', nameKey: 'profDoctor' as const },
    { id: 'Architect', icon: '🏗️', nameKey: 'profArchitect' as const },
    { id: 'Software Engineer', icon: '💻', nameKey: 'profSoftwareEngineer' as const },
    { id: 'Lawyer', icon: '⚖️', nameKey: 'profLawyer' as const },
    { id: 'Creative Director', icon: '🎨', nameKey: 'profCreativeDirector' as const },
    { id: 'Financial Analyst', icon: '📈', nameKey: 'profFinancialAnalyst' as const },
    { id: 'Pilot', icon: '👩‍✈️', nameKey: 'profPilot' as const },
    { id: 'Chef', icon: '👨‍🍳', nameKey: 'profChef' as const }
  ];

  const generateCase = async (profession: string) => {
    setIsGenerating(true);
    setCurrentProfession(profession);
    setEvaluation(null);
    setUserAction('');

    try {
      const generated = await generateSimulationCase(profession, language);
      
      const newCase: ActiveSimulation = {
        ...generated,
        id: Date.now().toString(),
        role: profession,
        icon: professions.find(p => p.id === profession)?.icon || '💼',
        imageUrl: `https://images.unsplash.com/photo-${getUnsplashId(profession)}?auto=format&fit=crop&w=1200&q=80`
      };
      
      setSelectedCase(newCase);
    } catch (err) {
      console.error("Case generation failed:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const getUnsplashId = (prof: string) => {
    const ids: Record<string, string> = {
      'Doctor': '1584432810621-ce21d3df1f51',
      'Architect': '1503387762-592dea58ef4e',
      'Software Engineer': '1498050108023-c5249f4df085',
      'Lawyer': '1589829545856-d10d557cf95f',
      'Creative Director': '1542744173-8e7e53415bb0',
      'Financial Analyst': '1590283603915-193eb3a44e5d',
      'Pilot': '1506012787146-f92b2d7d6d96',
      'Chef': '1556910103-1c02745aae4d'
    };
    return ids[prof] || '1454165833267-0e1e2c48ac23';
  };

  const handleNextCase = () => {
    if (currentProfession) generateCase(currentProfession);
  };

  const handleVRClick = () => {
    alert(t.vrBetaAlert);
  };

  const handleEvaluate = async () => {
    if (!userAction.trim() || !selectedCase) return;
    setIsLoading(true);
    try {
      const result = await evaluateSimulationResponse(selectedCase.role, selectedCase.situation, userAction, language);
      setEvaluation(result);
    } catch {
      alert(t.evaluationFailed);
    }
    setIsLoading(false);
  };

  const speakBrief = () => {
    if (!selectedCase) return;
    const utterance = new SpeechSynthesisUtterance(selectedCase.initialMessage);
    utterance.lang = language === 'tr' ? 'tr-TR' : 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  const startVoiceCapture = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return alert(t.browserNotSupported);
    const recognition = new SpeechRecognition();
    recognition.lang = language === 'tr' ? 'tr-TR' : 'en-US';
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setUserAction(prev => prev + (prev ? " " : "") + transcript);
    };
    recognition.start();
  };

  const glassStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(15px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '24px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
  };

  if (!selectedCase) {
    return (
      <div style={{ width: '100%', height: '100%', overflowY: 'auto', padding: '40px', color: '#fff' }}>
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '900', color: '#40e0d0', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '-1px' }}>
            {t.jobSimulations}
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '1.1rem', maxWidth: '800px', fontStyle: 'italic' }}>
            {t.simDisclaimer}
          </p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
          {professions.map(cat => (
            <div 
              key={cat.id} 
              onClick={() => !isGenerating && generateCase(cat.id)}
              style={{ 
                ...glassStyle, padding: '40px', cursor: isGenerating ? 'wait' : 'pointer', transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)', 
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px',
                opacity: isGenerating && currentProfession !== cat.id ? 0.4 : 1, 
                position: 'relative',
                transform: isGenerating && currentProfession === cat.id ? 'scale(1.05)' : 'none',
                borderColor: isGenerating && currentProfession === cat.id ? '#40e0d0' : 'rgba(255,255,255,0.08)'
              }}
              onMouseOver={e => { if (!isGenerating) { e.currentTarget.style.borderColor = '#40e0d0'; e.currentTarget.style.boxShadow = '0 12px 48px rgba(64, 224, 208, 0.2)'; } }}
              onMouseOut={e => { if (!isGenerating) { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.4)'; } }}
            >
              {isGenerating && currentProfession === cat.id && (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.6)', borderRadius: '24px', zIndex: 10 }}>
                  <div style={{ textAlign: 'center' }}>
                    <div className="sim-pulse" style={{ fontSize: '2rem', marginBottom: '10px' }}>📡</div>
                    <div style={{ color: '#40e0d0', fontWeight: '800', fontSize: '0.9rem', letterSpacing: '1px' }}>{t.generating}</div>
                  </div>
                </div>
              )}
              <div style={{ fontSize: '5rem', filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.1))' }}>{cat.icon}</div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#fff', margin: 0 }}>{t[cat.nameKey]}</h2>
              <button style={{ background: '#40e0d0', color: '#000', border: 'none', padding: '14px 35px', borderRadius: '50px', fontWeight: '800', cursor: 'pointer', transition: 'transform 0.2s' }}>
                {t.jobSimulations}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '100%', overflowY: 'auto', padding: '40px', color: '#fff', position: 'relative' }}>
      
      {/* HEADER SECTION */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
        <div>
          <button 
            onClick={() => setSelectedCase(null)} 
            style={{ background: 'transparent', border: 'none', color: '#40e0d0', cursor: 'pointer', fontSize: '1rem', fontWeight: '700', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <span>←</span> {t.backToSelection}
          </button>
          <h1 style={{ fontSize: '3rem', fontWeight: '900', color: '#fff', textTransform: 'uppercase', margin: 0, letterSpacing: '-1px' }}>
             {t[professions.find(p => p.id === selectedCase.role)?.nameKey || 'simulation']} <span style={{ color: '#40e0d0' }}>{t.simulation}</span>
          </h1>
          <div style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.6)', marginTop: '5px', fontWeight: '500' }}>
            {t.caseLabel}: {selectedCase.title}
          </div>
        </div>
        <button 
          onClick={handleVRClick}
          style={{ background: 'linear-gradient(135deg,#a78bfa,#7c3aed)', color: '#fff', border: 'none', padding: '15px 30px', borderRadius: '50px', cursor: 'pointer', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 10px 25px rgba(124, 58, 237, 0.4)', transition: 'transform 0.2s' }}
          onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          🥽 {t.adaptToVR}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.6fr) minmax(0, 1fr)', gap: '35px' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
          
          {/* PREMIUM VISUALIZER */}
          <div style={{ 
            ...glassStyle, height: '480px', position: 'relative', overflow: 'hidden', 
            background: '#000',
            border: '2px solid rgba(64, 224, 208, 0.3)'
          }}>
            <div className="sim-scanline" />
            <div className="sim-noise" />
            
            {/* Visualizer Overlays */}
            <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <div style={{ fontSize: '0.7rem', color: '#40e0d0', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff4b2b', animation: 'simPulse 1.5s infinite' }} />
                {t.liveFeed}
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#fff', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                {t[professions.find(p => p.id === selectedCase.role)?.nameKey || 'simulation'].toUpperCase()} // ENV_NODE_01
              </div>
            </div>

            <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 10, textAlign: 'right' }}>
              <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', fontWeight: '700' }}>{t.statusLabel}</div>
              <div style={{ fontSize: '0.85rem', color: '#40e0d0', fontWeight: '800', fontFamily: 'monospace' }}>{feedStatus}</div>
            </div>

            <div style={{ position: 'absolute', bottom: '20px', left: '20px', zIndex: 10 }}>
              <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', fontWeight: '700' }}>{t.coordinates}</div>
              <div style={{ fontSize: '0.8rem', color: '#fff', fontWeight: '600', fontFamily: 'monospace' }}>41.0082° N, 28.9784° E</div>
            </div>
            
            {selectedCase.imageUrl && (
              <img 
                src={selectedCase.imageUrl} 
                alt={t.simulationFeed} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7, transform: 'scale(1.05)' }} 
              />
            )}

            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(circle, transparent 20%, rgba(0,0,0,0.4) 80%)' }} />
           </div>

          {/* PROFESSONAL CONTEXT / BRIEF */}
          <div style={{ ...glassStyle, padding: '35px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: '#40e0d0' }} />
            <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#40e0d0', textTransform: 'uppercase', marginBottom: '20px', letterSpacing: '1px', fontWeight: '800' }}>
              📁 {t.detailedBrief}
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
              <div style={{ padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <strong style={{ color: '#40e0d0', display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '10px' }}>
                  {selectedCase.role === 'Doctor' ? t.medicalHistory : 
                   selectedCase.role === 'Architect' ? t.architectBriefLabel : 
                   selectedCase.role === 'Software Engineer' ? t.developerReportLabel : t.lawyerDetailsLabel}
                </strong>
                <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>
                  {selectedCase.professionalContext}
                </div>
              </div>

              <div style={{ padding: '25px', background: 'rgba(64, 224, 208, 0.05)', borderRadius: '16px', border: '1px solid rgba(64, 224, 208, 0.2)' }}>
                <strong style={{ color: '#40e0d0', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '12px' }}>
                  <span style={{ fontSize: '1.2rem' }}>🚨</span> Current Situation
                </strong>
                <p style={{ margin: 0, fontSize: '1.1rem', lineHeight: '1.6', color: '#fff', fontWeight: '500' }}>
                  {selectedCase.situation}
                </p>
              </div>
            </div>
          </div>

          {/* INTERACTION CARD */}
          <div style={{ ...glassStyle, padding: '35px', display: 'flex', gap: '25px', alignItems: 'flex-start' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '24px', background: 'linear-gradient(135deg, #40e0d0, #2a9d8f)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', flexShrink: 0, boxShadow: '0 8px 24px rgba(64, 224, 208, 0.3)' }}>
              {selectedCase.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{ fontSize: '0.9rem', color: '#40e0d0', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Contact {t.characterSays}:
                </div>
                <button 
                  onClick={speakBrief}
                  style={{ background: 'rgba(64, 224, 208, 0.1)', border: '1px solid #40e0d0', color: '#40e0d0', borderRadius: '50px', padding: '6px 16px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '700', transition: 'all 0.2s' }}
                  onMouseOver={e => { e.currentTarget.style.background = '#40e0d0'; e.currentTarget.style.color = '#000'; }}
                  onMouseOut={e => { e.currentTarget.style.background = 'rgba(64, 224, 208, 0.1)'; e.currentTarget.style.color = '#40e0d0'; }}
                >
                  🔊 {t.readAloud}
                </button>
              </div>
              <p style={{ fontSize: '1.6rem', lineHeight: '1.4', color: '#fff', margin: 0, fontWeight: '700', letterSpacing: '-0.5px' }}>
                "{selectedCase.initialMessage}"
              </p>
              <div style={{ display: 'flex', gap: '12px', marginTop: '20px', alignItems: 'center' }}>
                <div style={{ width: '10px', height: '10px', background: '#40e0d0', borderRadius: '50%', animation: 'simPulse 1s infinite' }} />
                <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', fontWeight: '700' }}>{t.listening}</span>
              </div>
            </div>
          </div>
        </div>

        {/* DECISION & FEEDBACK PANEL */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
           <div style={{ 
             ...glassStyle, padding: '35px', display: 'flex', flexDirection: 'column', gap: '25px',
             background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)'
           }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#fff', fontWeight: '800', textTransform: 'uppercase' }}>
                  {t.yourDecision}
                </h3>
                <button 
                  onClick={startVoiceCapture}
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '50px', padding: '8px 20px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '700', transition: 'all 0.2s' }}
                  onMouseOver={e => e.currentTarget.style.borderColor = '#40e0d0'}
                  onMouseOut={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                >
                  🎤 {t.voiceInput}
                </button>
              </div>
              
              <textarea 
                value={userAction}
                onChange={e => setUserAction(e.target.value)}
                placeholder={t.typeMessage}
                style={{ 
                  width: '100%', height: '240px', background: 'rgba(0,0,0,0.4)', 
                  border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', 
                  padding: '25px', color: '#fff', fontSize: '1.1rem', outline: 'none', 
                  resize: 'none', lineHeight: '1.6', transition: 'border-color 0.3s'
                }}
                onFocus={e => e.currentTarget.style.borderColor = '#40e0d0'}
                onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
              
              <button 
                onClick={handleEvaluate} 
                disabled={isLoading || !userAction.trim()}
                style={{ 
                  width: '100%', 
                  background: isLoading ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg,#40e0d0,#2a9d8f)', 
                  color: isLoading ? '#666' : '#000', border: 'none', padding: '18px', 
                  borderRadius: '16px', fontWeight: '900', fontSize: '1.1rem', cursor: isLoading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                {isLoading ? `🤖 ${t.aiEvaluating}` : `📡 ${t.sendDecision}`}
              </button>
           </div>

           {evaluation && (
             <div style={{ ...glassStyle, padding: '40px', border: '2px solid #40e0d0', background: 'rgba(64, 224, 208, 0.08)', animation: 'langDropIn 0.4s ease-out' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                 <div style={{ width: '45px', height: '45px', borderRadius: '12px', background: '#40e0d0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>💡</div>
                 <h3 style={{ margin: 0, fontSize: '1.3rem', color: '#fff', fontWeight: '900', textTransform: 'uppercase' }}>{t.mentorFeedback}</h3>
               </div>
               
               <div style={{ color: '#fff', lineHeight: '1.8', fontSize: '1.05rem', whiteSpace: 'pre-wrap', background: 'rgba(0,0,0,0.2)', padding: '25px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                 {evaluation}
               </div>

               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '25px' }}>
                 <button 
                  onClick={() => { setEvaluation(null); setUserAction(''); }}
                  style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '15px', borderRadius: '12px', cursor: 'pointer', fontSize: '1rem', fontWeight: '700', transition: 'all 0.2s' }}
                  onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                  onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                 >
                   {t.tryDifferent}
                 </button>
                 <button 
                  onClick={handleNextCase}
                  style={{ background: '#fff', border: 'none', color: '#000', padding: '15px', borderRadius: '12px', cursor: 'pointer', fontSize: '1rem', fontWeight: '900', transition: 'transform 0.2s' }}
                  onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'none'}
                 >
                   {t.nextCase} ➔
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
