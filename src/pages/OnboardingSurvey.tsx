import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { sendMessage } from '../services/llm';

const LIKERT_QUESTIONS = [
  "I enjoy analyzing and solving complex problems.",
  "I am confident in communicating with and persuading people.",
  "Generating new ideas and doing creative projects motivates me.",
  "Leading a group and making decisions comes naturally to me.",
  "I have an interest in computers, technology, or engineering."
];

const MC_QUESTIONS = [
  {
    q: "What do you prefer to do in your free time?",
    options: [
      "A) Puzzles, strategy games, coding",
      "B) Painting, music, writing",
      "C) Spending time with friends",
      "D) Playing sports or competing",
      "E) Learning something new / watching documentaries"
    ]
  },
  {
    q: "What role would you like to take in a project?",
    options: [
      "A) Analysis and planning",
      "B) Design and creativity",
      "C) Communication with people",
      "D) Leadership and organization",
      "E) Technical development / software"
    ]
  },
  {
    q: "What motivates you the most?",
    options: [
      "A) Solving problems",
      "B) Creating something new",
      "C) Helping people",
      "D) Success and leadership",
      "E) Technology and systems"
    ]
  },
  {
    q: "Which subjects do you like more?",
    options: [
      "A) Math / Economics",
      "B) Art / Literature",
      "C) Psychology / Sociology",
      "D) Business / History / Politics",
      "E) Computer Science / Physics"
    ]
  },
  {
    q: "What is the most important criterion when choosing a job?",
    options: [
      "A) Salary",
      "B) Creativity",
      "C) Working with people",
      "D) Power and responsibility",
      "E) Technology / innovation"
    ]
  }
];

const OPEN_QUESTIONS = [
  "What is your dream job like? Explain briefly.",
  "Are you happier when solving a problem or when designing something new? Why?",
  "Do you prefer working with people or working alone? Explain.",
  "What are the 3 skills you see yourself as strongest in?",
  "What would you like to change or improve in the world in the future?"
];

export default function OnboardingSurvey() {
  const { user, completeSurvey } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State for answers
  const [likertAnswers, setLikertAnswers] = useState<number[]>(Array(5).fill(3));
  const [mcAnswers, setMcAnswers] = useState<string[]>(Array(5).fill(''));
  const [openAnswers, setOpenAnswers] = useState<string[]>(Array(5).fill(''));


  const isStep2Valid = mcAnswers.every(a => a !== '');
  const isStep3Valid = openAnswers.every(a => a.trim().length > 0);

  const handleSubmit = async () => {
    if (!isStep3Valid) return;
    setIsSubmitting(true);

    // Calculate quantitative affinity scores
    // Mapping keys: Analytical, Creative, Social, Leadership, Technical
    const affinityScores = { Analytical: 0, Creative: 0, Social: 0, Leadership: 0, Technical: 0 };
    
    // Likert influence (1-5 scaled to 0-20 per question)
    affinityScores.Analytical += likertAnswers[0] * 4;
    affinityScores.Social += likertAnswers[1] * 4;
    affinityScores.Creative += likertAnswers[2] * 4;
    affinityScores.Leadership += likertAnswers[3] * 4;
    affinityScores.Technical += likertAnswers[4] * 4;

    // MC influence (Adds flat 15 points per matching category)
    mcAnswers.forEach(ans => {
        if (ans.startsWith('A')) affinityScores.Analytical += 15;
        if (ans.startsWith('B')) affinityScores.Creative += 15;
        if (ans.startsWith('C')) affinityScores.Social += 15;
        if (ans.startsWith('D')) affinityScores.Leadership += 15;
        if (ans.startsWith('E')) affinityScores.Technical += 15;
    });

    // Normalize slightly to max 100 for absolute perfection display
    Object.keys(affinityScores).forEach(key => {
        const k = key as keyof typeof affinityScores;
        affinityScores[k] = Math.min(100, affinityScores[k] + 25); // Boost flat +25 base to avoid 0s and cap at 100
    });

    // Build the prompt
    let prompt = `You are an expert career counselor AI for PERSONAI. You are analyzing a new user's onboarding survey to generate a highly personalized "Career Profile Summary".
The user is answering a 3-part test. Read their answers carefully and produce a comprehensive, motivating, and highly professional 3-4 paragraph analysis of their strengths, potential career paths, and a welcoming message. Use Markdown formatting (bolding, bullet points for career paths).

Here are their answers:

**Part 1: Likert Scale (1 = Strongly Disagree, 5 = Strongly Agree)**\n`;
    LIKERT_QUESTIONS.forEach((q, i) => {
      prompt += `- ${q}: **${likertAnswers[i]} / 5**\n`;
    });

    prompt += `\n**Part 2: Multiple Choice Preferences**\n`;
    MC_QUESTIONS.forEach((q, i) => {
      prompt += `- ${q.q}: **${mcAnswers[i]}**\n`;
    });

    prompt += `\n**Part 3: Open-Ended Insights**\n`;
    OPEN_QUESTIONS.forEach((q, i) => {
      prompt += `- Question: ${q}\n  Answer: **${openAnswers[i]}**\n`;
    });

    prompt += `\nBased on these detailed answers, provide the Career Profile Summary directly (no introductory conversational filler like 'Here is the analysis'). Start with a strong, encouraging headline. Keep it structured and visually appealing using Markdown.`;

    try {
      const response = await sendMessage([{ role: 'user', content: prompt }]);
      completeSurvey(response, affinityScores);
      navigate('/myhomepage');
    } catch (e) {
      console.error(e);
      alert("Failed to analyze survey. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return (
      <div style={{
          width: '100%', height: '100%', display: 'flex', flexDirection: 'column', 
          alignItems: 'center', justifyContent: 'center', background: '#2e2e2e', color: '#fff'
      }}>
        <div style={{ fontSize: '4rem', animation: 'pulse 1.5s infinite' }}>🧠</div>
        <h2 style={{ color: '#40e0d0', marginTop: '20px' }}>Analyzing Your Profile...</h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '10px' }}>Our AI is designing your personalized career roadmap.</p>
        <style>{'@keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }'}</style>
      </div>
    );
  }

  return (
    <div style={{
      width: '100%', height: '100%', background: 'transparent', color: '#fff', 
      padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center',
      overflowY: 'auto'
    }}>
      <div style={{ maxWidth: '800px', width: '100%', margin: 'auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ color: '#40e0d0', fontSize: '2.5rem', textTransform: 'uppercase', marginBottom: '10px' }}>Welcome, {user?.name || 'Trainee'}</h1>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)' }}>
            To personalize your PERSONAI experience, please complete this career profiling survey.
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
             {[1, 2, 3].map(s => (
                <div key={s} style={{
                    width: '30px', height: '8px', borderRadius: '4px',
                    background: s <= step ? '#40e0d0' : 'rgba(255,255,255,0.1)'
                }}/>
             ))}
          </div>
        </div>

        {/* --- STEP 1: LIKERT --- */}
        {step === 1 && (
          <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '24px', padding: '40px', border: '1px solid rgba(64,224,208,0.2)' }}>
            <h2 style={{ color: '#fff', marginBottom: '10px' }}>Part 1: Self-Assessment</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '30px', fontSize: '0.9rem' }}>1 = Strongly Disagree, 5 = Strongly Agree</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              {LIKERT_QUESTIONS.map((q, i) => (
                <div key={i}>
                  <label style={{ display: 'block', marginBottom: '15px', fontSize: '1.1rem' }}>{q}</label>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '0.8rem', color: '#888' }}>1</span>
                    <input 
                      type="range" min="1" max="5" step="1" 
                      value={likertAnswers[i]}
                      onChange={(e) => {
                        const newAns = [...likertAnswers];
                        newAns[i] = parseInt(e.target.value);
                        setLikertAnswers(newAns);
                      }}
                      style={{ flex: 1, accentColor: '#40e0d0', cursor: 'pointer' }}
                    />
                    <span style={{ fontSize: '0.8rem', color: '#888' }}>5</span>
                    <span style={{ marginLeft: '15px', background: 'rgba(64,224,208,0.2)', color: '#40e0d0', padding: '4px 12px', borderRadius: '12px', fontWeight: 'bold' }}>
                      {likertAnswers[i]}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '40px' }}>
              <button onClick={() => setStep(2)} style={btnStyle(true)}>Next Part →</button>
            </div>
          </div>
        )}

        {/* --- STEP 2: MULTIPLE CHOICE --- */}
        {step === 2 && (
          <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '24px', padding: '40px', border: '1px solid rgba(64,224,208,0.2)' }}>
            <h2 style={{ color: '#fff', marginBottom: '10px' }}>Part 2: Preferences</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '30px', fontSize: '0.9rem' }}>Select the option that best describes you.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              {MC_QUESTIONS.map((qObj, i) => (
                <div key={i}>
                  <label style={{ display: 'block', marginBottom: '15px', fontSize: '1.1rem', fontWeight: '600', color: '#40e0d0' }}>{qObj.q}</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {qObj.options.map((opt, optIndex) => (
                      <label key={optIndex} style={{ 
                        display: 'flex', alignItems: 'center', gap: '10px', 
                        padding: '12px 16px', background: mcAnswers[i] === opt ? 'rgba(64,224,208,0.15)' : 'rgba(0,0,0,0.2)', 
                        border: mcAnswers[i] === opt ? '1px solid #40e0d0' : '1px solid transparent',
                        borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s'
                      }}>
                        <input 
                          type="radio" name={`q${i}`} value={opt}
                          checked={mcAnswers[i] === opt}
                          onChange={(e) => {
                            const newAns = [...mcAnswers];
                            newAns[i] = e.target.value;
                            setMcAnswers(newAns);
                          }}
                          style={{ accentColor: '#40e0d0', transform: 'scale(1.2)' }}
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
              <button onClick={() => setStep(1)} style={btnStyleOutline()}>← Back</button>
              <button onClick={() => setStep(3)} disabled={!isStep2Valid} style={btnStyle(isStep2Valid)}>Next Part →</button>
            </div>
          </div>
        )}

        {/* --- STEP 3: OPEN ENDED --- */}
        {step === 3 && (
          <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '24px', padding: '40px', border: '1px solid rgba(64,224,208,0.2)' }}>
            <h2 style={{ color: '#fff', marginBottom: '10px' }}>Part 3: Deep Dive</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '30px', fontSize: '0.9rem' }}>Answer these questions with a short sentence or two.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              {OPEN_QUESTIONS.map((q, i) => (
                <div key={i}>
                  <label style={{ display: 'block', marginBottom: '10px', fontSize: '1.05rem', color: '#40e0d0' }}>{q}</label>
                  <textarea 
                    rows={3}
                    value={openAnswers[i]}
                    onChange={(e) => {
                      const newAns = [...openAnswers];
                      newAns[i] = e.target.value;
                      setOpenAnswers(newAns);
                    }}
                    placeholder="Type your answer here..."
                    style={{ 
                      width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px', padding: '16px', color: '#fff', fontSize: '1rem', resize: 'vertical',
                      outline: 'none', fontFamily: 'Outfit, sans-serif'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#40e0d0'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
              <button onClick={() => setStep(2)} style={btnStyleOutline()}>← Back</button>
              <button onClick={handleSubmit} disabled={!isStep3Valid} style={{...btnStyle(isStep3Valid), background: isStep3Valid ? 'linear-gradient(135deg, #40e0d0, #2a9d8f)' : '#555', color: '#1a1a1a'}}>
                Submit to AI
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// Helpers for button styling
const btnStyle = (isValid: boolean) => ({
  background: isValid ? '#40e0d0' : '#555',
  color: isValid ? '#2e2e2e' : '#888',
  border: 'none', padding: '12px 24px', borderRadius: '50px',
  fontSize: '1rem', fontWeight: '600', cursor: isValid ? 'pointer' : 'not-allowed',
  transition: 'all 0.2s', fontFamily: 'Outfit, sans-serif'
});

const btnStyleOutline = () => ({
  background: 'transparent',
  color: '#fff',
  border: '1px solid rgba(255,255,255,0.3)', padding: '12px 24px', borderRadius: '50px',
  fontSize: '1rem', fontWeight: '600', cursor: 'pointer',
  transition: 'all 0.2s', fontFamily: 'Outfit, sans-serif'
});
