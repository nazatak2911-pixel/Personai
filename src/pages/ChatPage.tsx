import ChatInterface from '../components/ChatInterface';
import { useNavigate } from 'react-router-dom';

const ChatPage = () => {
    const navigate = useNavigate();

    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            background: 'transparent',
        }}>
            {/* Header */}
            <div style={{
                padding: '20px 30px 0 30px',
                flexShrink: 0,
            }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <h1 style={{
                        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                        fontWeight: '800',
                        color: '#40e0d0',
                        textTransform: 'uppercase',
                        letterSpacing: '-1px',
                        lineHeight: 1,
                    }}>
                        PERSONA<span style={{ color: '#ffffff' }}>I</span>
                    </h1>
                    <button
                        onClick={() => navigate('/personi')}
                        style={{
                            background: 'rgba(64,224,208,0.08)',
                            border: '1px solid rgba(64,224,208,0.25)',
                            borderRadius: '50px',
                            color: '#40e0d0',
                            padding: '8px 18px',
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            fontFamily: 'Outfit, sans-serif',
                            fontWeight: '600',
                        }}
                    >
                        ← Back to Feature
                    </button>
                </div>
                <div style={{
                    height: '1px',
                    background: 'linear-gradient(to right, rgba(64,224,208,0.4), transparent)',
                    marginBottom: '0',
                }} />
            </div>

            {/* Chat fills remaining space */}
            <div style={{ flex: 1, overflow: 'hidden' }}>
                <ChatInterface />
            </div>
        </div>
    );
};

export default ChatPage;
