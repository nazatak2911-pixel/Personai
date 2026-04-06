import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { ContactRequest, ChatMessage } from '../pages/MyNetwork';
import { moderateContent } from '../services/llm';

const ContactInbox: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [requests, setRequests] = useState<ContactRequest[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [isSending, setIsSending] = useState(false);

  // Sync with localStorage
  useEffect(() => {
    const syncRequests = () => {
      const stored = localStorage.getItem('network_requests');
      if (stored) {
        try {
          const allRequests: ContactRequest[] = JSON.parse(stored);
          if (user) {
            const myRequests = allRequests.filter(
              r => r.toEmail === user.email || r.fromEmail === user.email
            );
            setRequests(myRequests);
          }
        } catch (e) {
          console.error("Failed to parse requests", e);
        }
      }
    };

    syncRequests();
    
    // Listen for storage changes from other tabs/components
    window.addEventListener('storage', syncRequests);
    
    // Custom event for same-window updates (since MyNetwork might update state)
    const interval = setInterval(syncRequests, 2000);
    
    return () => {
      window.removeEventListener('storage', syncRequests);
      clearInterval(interval);
    };
  }, [user]);

  if (!user) return null;

  const pendingCount = requests.filter(r => r.toEmail === user.email && r.status === 'pending').length;

  const handleSendMessage = async () => {
    if (!messageText.trim() || !activeChatId || isSending) return;
    setIsSending(true);

    try {
      // Content Moderation
      const mod = await moderateContent(messageText);
      if (!mod.safe) {
        alert(`${t.translate}: ${mod.reason}`);
        setIsSending(false);
        return;
      }

      const allRequests: ContactRequest[] = JSON.parse(localStorage.getItem('network_requests') || '[]');
      const updated = allRequests.map(r => {
        if (r.id === activeChatId) {
          const newMessage: ChatMessage = {
            senderEmail: user.email,
            text: messageText,
            timestamp: Date.now()
          };
          return { ...r, messages: [...r.messages, newMessage] };
        }
        return r;
      });

      localStorage.setItem('network_requests', JSON.stringify(updated));
      setMessageText('');
      
      // Update local state immediately
      setRequests(updated.filter(r => r.toEmail === user.email || r.fromEmail === user.email));
    } catch (e) {
      console.error("Message send failed", e);
    } finally {
      setIsSending(false);
    }
  };

  const glassStyle: React.CSSProperties = {
    background: 'rgba(20, 20, 20, 0.85)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '20px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
    color: '#fff',
    fontFamily: "'Outfit', sans-serif",
  };

  return (
    <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 1000 }}>
      {/* TOGGLE BUTTON */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            ...glassStyle,
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.8rem',
            position: 'relative',
            transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            border: '2px solid rgba(64, 224, 208, 0.4)'
          }}
          onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          💬
          {pendingCount > 0 && (
            <div style={{
              position: 'absolute',
              top: '-5px',
              right: '-5px',
              background: '#ff4b2b',
              color: '#fff',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              fontSize: '0.75rem',
              fontWeight: '900',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid #1a1a1a'
            }}>
              {pendingCount}
            </div>
          )}
        </button>
      )}

      {/* CHAT PANEL */}
      {isOpen && (
        <div style={{
          ...glassStyle,
          width: '380px',
          height: '550px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'langDropIn 0.3s ease-out'
        }}>
          {/* HEADER */}
          <div style={{
            padding: '20px',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'rgba(64, 224, 208, 0.05)'
          }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '800', color: '#40e0d0' }}>
              {activeChatId ? t.conversation : t.inbox}
            </h3>
            <button
              onClick={() => {
                if (activeChatId) setActiveChatId(null);
                else setIsOpen(false);
              }}
              style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: '1.2rem', padding: '5px' }}
            >
              {activeChatId ? '←' : '✕'}
            </button>
          </div>

          {/* CONTENT */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '15px' }}>
            {!activeChatId ? (
              /* LIST VIEW */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {requests.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px', color: 'rgba(255,255,255,0.4)' }}>
                    {t.noMessages}
                  </div>
                ) : (
                  requests.map(r => {
                    const otherName = r.fromEmail === user.email ? r.toName : r.fromName;
                    const lastMsg = r.messages[r.messages.length - 1]?.text || r.introduction;
                    
                    return (
                      <div
                        key={r.id}
                        onClick={() => r.status === 'accepted' && setActiveChatId(r.id)}
                        style={{
                          padding: '15px',
                          borderRadius: '16px',
                          background: r.status === 'pending' ? 'rgba(64, 224, 208, 0.03)' : 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.05)',
                          cursor: r.status === 'accepted' ? 'pointer' : 'default',
                          transition: 'background 0.2s'
                        }}
                        onMouseOver={e => { if (r.status === 'accepted') e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
                        onMouseOut={e => { if (r.status === 'accepted') e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                          <span style={{ fontWeight: '800', fontSize: '0.95rem' }}>{otherName}</span>
                          <span style={{ 
                            fontSize: '0.65rem', 
                            textTransform: 'uppercase', 
                            color: r.status === 'accepted' ? '#40e0d0' : '#ffa500',
                            fontWeight: '900'
                          }}>
                            {r.status === 'accepted' ? t.accepted : r.status === 'pending' ? t.pending : t.rejected}
                          </span>
                        </div>
                        <div style={{ 
                          fontSize: '0.8rem', 
                          color: 'rgba(255,255,255,0.5)', 
                          overflow: 'hidden', 
                          textOverflow: 'ellipsis', 
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          lineHeight: '1.4'
                        }}>
                          {lastMsg}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            ) : (
              /* CHAT VIEW */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', height: '100%' }}>
                {requests.find(r => r.id === activeChatId)?.messages.map((m, idx) => {
                  const isMe = m.senderEmail === user.email;
                  return (
                    <div
                      key={idx}
                      style={{
                        alignSelf: isMe ? 'flex-end' : 'flex-start',
                        maxWidth: '80%',
                        padding: '12px 16px',
                        borderRadius: isMe ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                        background: isMe ? '#40e0d0' : 'rgba(255,255,255,0.1)',
                        color: isMe ? '#000' : '#fff',
                        fontSize: '0.9rem',
                        lineHeight: '1.5',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                      }}
                    >
                      {m.text}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* INPUT AREA */}
          {activeChatId && (
            <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: '10px' }}>
              <input
                type="text"
                value={messageText}
                onChange={e => setMessageText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                placeholder={t.typeMessage}
                disabled={isSending}
                style={{
                  flex: 1,
                  background: 'rgba(0,0,0,0.2)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '30px',
                  padding: '10px 20px',
                  color: '#fff',
                  outline: 'none',
                  fontSize: '0.9rem'
                }}
              />
              <button
                onClick={handleSendMessage}
                disabled={isSending || !messageText.trim()}
                style={{
                  background: '#40e0d0',
                  color: '#000',
                  border: 'none',
                  borderRadius: '50%',
                  width: '42px',
                  height: '42px',
                  cursor: 'pointer',
                  fontWeight: '900',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: isSending || !messageText.trim() ? 0.5 : 1
                }}
              >
                {isSending ? '...' : '➤'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ContactInbox;
