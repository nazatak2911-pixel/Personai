import { useState, useRef, useEffect } from 'react';
import { sendMessage, ChatMessage } from '../services/llm';
import { useAuth } from '../context/AuthContext';

interface ChatInterfaceProps {
  initialPrompt?: string;
  contextTitle?: string;
  skipIntro?: boolean;
}

const TypingIndicator = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '12px 16px' }}>
    {[0, 1, 2].map((i) => (
      <div key={i} style={{
        width: '8px', height: '8px', borderRadius: '50%',
        background: '#40e0d0',
        animation: 'typingBounce 1.2s ease-in-out infinite',
        animationDelay: `${i * 0.2}s`,
      }} />
    ))}
    <style>{`
      @keyframes typingBounce {
        0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
        30% { transform: translateY(-6px); opacity: 1; }
      }
    `}</style>
  </div>
);

export default function ChatInterface({ initialPrompt, contextTitle, skipIntro }: ChatInterfaceProps) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Unique history key mapped to the current user
  const storageKey = user ? `chat_history_${user.email}` : 'chat_history_guest';

  // Load History or initialize with personalized system context
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setMessages(JSON.parse(saved));
      setHasStarted(true);
    } else if (user) {
      // Setup aggressive memory context if they have taken the survey and never chatted
      const personalityContext: ChatMessage = {
        role: 'system',
        content: `You are PERSONAI, an expert AI career mentor. You are talking to a user named ${user.name}.
Do NOT introduce yourself as an AI every time. Speak directly to them normally.
Here is what you know about them from their onboarding test:
${user.surveyResults ? user.surveyResults : 'They are looking for general career advice.'}
If they ask for specific career paths, factor in their test results. Treat them like a valued client.`
      };
      
      const bootMessages = [personalityContext];
      if (initialPrompt) {
        bootMessages.push({ role: 'user', content: initialPrompt });
        setMessages(bootMessages);
        setHasStarted(true);
        // We trigger the first send immediately for the prompt
        triggerAI(bootMessages);
      } else {
        setMessages(bootMessages);
        localStorage.setItem(storageKey, JSON.stringify(bootMessages));
      }
    } else if (initialPrompt && !hasStarted) {
      // Guest or standalone initial prompt
      setHasStarted(true);
      const startingMsg = [{ role: 'user' as const, content: initialPrompt }];
      setMessages(startingMsg);
      triggerAI(startingMsg);
    }
  }, [user, initialPrompt]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const triggerAI = async (currentMessages: ChatMessage[]) => {
    setIsLoading(true);
    try {
      const reply = await sendMessage(currentMessages);
      const updatedMessages = [...currentMessages, { role: 'assistant' as const, content: reply }];
      setMessages(updatedMessages);
      localStorage.setItem(storageKey, JSON.stringify(updatedMessages));
    } catch {
      const errorMsg = [...currentMessages, { role: 'assistant' as const, content: "I'm having trouble connecting right now. Please try again in a moment!" }];
      setMessages(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', content: trimmed };
    const newMessages = [...messages, userMsg];

    setMessages(newMessages);
    localStorage.setItem(storageKey, JSON.stringify(newMessages));
    setInput('');
    
    await triggerAI(newMessages);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  };

  const suggestedPrompts = [
    "What career suits someone who loves both tech and people?",
    "How do I write a CV with no work experience?",
    "What should I expect in a marketing internship?",
    "I'm 16 and passionate about art. What are my career options?",
  ];

  // Filter out system messages so the user doesn't see their own hidden profile payload
  const displayMessages = messages.filter(m => m.role !== 'system');

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100%', width: '100%',
      background: 'transparent', overflow: 'hidden'
    }}>
      {/* Chat Header */}
      <div style={{
        padding: '16px 20px', borderBottom: '1px solid rgba(64, 224, 208, 0.2)',
        display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0
      }}>
        <div style={{
          width: '40px', height: '40px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #40e0d0, #2a9d8f)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.2rem', fontWeight: '800', color: '#1a1a1a', flexShrink: 0
        }}>P</div>
        <div>
          <div style={{ fontWeight: '700', fontSize: '1rem', color: '#ffffff' }}>
            PERSONA<span style={{ color: '#40e0d0' }}>I</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#40e0d0', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#40e0d0' }} />
            AI Career Mentor {contextTitle ? `· ${contextTitle}` : ''}
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div style={{
        flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px',
        scrollbarWidth: 'thin', scrollbarColor: 'rgba(64,224,208,0.3) transparent'
      }}>
        {displayMessages.length === 0 && !isLoading && !skipIntro && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', paddingTop: '20px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>👋</div>
              <h3 style={{ color: '#40e0d0', fontSize: '1.2rem', fontWeight: '700', marginBottom: '6px', textTransform: 'uppercase' }}>
                Welcome back, {user?.name || 'Trainee'}
              </h3>
              <p style={{ color: '#b0b0b0', fontSize: '0.9rem', lineHeight: '1.6', maxWidth: '320px' }}>
                I'm already up to speed on your personalized profile. Ask me anything about your career path based on our analysis.
              </p>
            </div>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <p style={{ color: '#888', fontSize: '0.8rem', textAlign: 'center', marginBottom: '4px' }}>
                Try asking:
              </p>
              {suggestedPrompts.map((prompt, i) => (
                <button key={i}
                  onClick={() => handleSend(prompt)}
                  style={{
                    padding: '12px 16px', background: 'rgba(64, 224, 208, 0.07)',
                    border: '1px solid rgba(64, 224, 208, 0.2)', borderRadius: '12px',
                    color: '#d0d0d0', fontSize: '0.875rem', cursor: 'pointer',
                    textAlign: 'left', transition: 'all 0.2s ease', fontFamily: 'Outfit, sans-serif'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'rgba(64, 224, 208, 0.15)';
                    e.currentTarget.style.borderColor = 'rgba(64, 224, 208, 0.5)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(64, 224, 208, 0.07)';
                    e.currentTarget.style.borderColor = 'rgba(64, 224, 208, 0.2)';
                  }}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {displayMessages.map((msg, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
            alignItems: 'flex-end', gap: '8px'
          }}>
            {msg.role === 'assistant' && (
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #40e0d0, #2a9d8f)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.75rem', fontWeight: '800', color: '#1a1a1a', flexShrink: 0
              }}>P</div>
            )}
            <div style={{
              maxWidth: '80%', padding: '12px 16px',
              borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
              background: msg.role === 'user' ? 'linear-gradient(135deg, #40e0d0, #2a9d8f)' : 'rgba(40, 40, 40, 0.9)',
              border: msg.role === 'user' ? 'none' : '1px solid rgba(64, 224, 208, 0.15)',
              color: msg.role === 'user' ? '#1a1a1a' : '#e8e8e8',
              fontSize: '0.925rem', lineHeight: '1.6', fontWeight: msg.role === 'user' ? '500' : '400',
              whiteSpace: 'pre-wrap', wordBreak: 'break-word'
            }}>
              {msg.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #40e0d0, #2a9d8f)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: '800', color: '#1a1a1a', flexShrink: 0 }}>P</div>
            <div style={{ background: 'rgba(40, 40, 40, 0.9)', border: '1px solid rgba(64, 224, 208, 0.15)', borderRadius: '18px 18px 18px 4px' }}>
              <TypingIndicator />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <div style={{
        padding: '16px 20px', borderTop: '1px solid rgba(64, 224, 208, 0.2)',
        display: 'flex', gap: '10px', alignItems: 'flex-end', flexShrink: 0, background: 'rgba(20, 20, 20, 0.8)'
      }}>
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            e.target.style.height = 'auto';
            e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
          }}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything..."
          disabled={isLoading}
          rows={1}
          style={{
            flex: 1, padding: '12px 16px', background: 'rgba(40, 40, 40, 0.8)',
            border: '1px solid rgba(64, 224, 208, 0.25)', borderRadius: '16px', color: '#ffffff',
            fontSize: '0.925rem', resize: 'none', fontFamily: 'Outfit, sans-serif', outline: 'none',
            lineHeight: '1.5', maxHeight: '120px', overflowY: 'auto', transition: 'border-color 0.2s ease'
          }}
          onFocus={(e) => e.target.style.borderColor = 'rgba(64, 224, 208, 0.6)'}
          onBlur={(e) => e.target.style.borderColor = 'rgba(64, 224, 208, 0.25)'}
        />
        <button
          onClick={() => handleSend(input)} disabled={isLoading || !input.trim()}
          style={{
            width: '44px', height: '44px', borderRadius: '50%', border: 'none',
            background: input.trim() && !isLoading ? 'linear-gradient(135deg, #40e0d0, #2a9d8f)' : 'rgba(60, 60, 60, 0.8)',
            cursor: input.trim() && !isLoading ? 'pointer' : 'not-allowed',
            display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s ease', flexShrink: 0
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M22 2L11 13" stroke={input.trim() && !isLoading ? '#1a1a1a' : '#666'} strokeWidth="2.5" strokeLinecap="round" />
            <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke={input.trim() && !isLoading ? '#1a1a1a' : '#666'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
