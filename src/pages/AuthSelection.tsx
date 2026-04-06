import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const AuthSelection = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();

    const options = [
        {
            title: t.logIn,
            desc: "Access your personalized career journey.",
            path: "/",
            icon: "🔑",
            color: "#40e0d0"
        },
        {
            title: t.signUp,
            desc: "Create an account to save your progress.",
            path: "/",
            icon: "✨",
            color: "#ffffff"
        },
        {
            title: "Continue without account",
            desc: "Try the AI Chatbot immediately as a guest.",
            path: "/chat",
            icon: "👤",
            color: "rgba(255,255,255,0.7)"
        }
    ];

    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            background: 'transparent',
            color: '#ffffff'
        }}>
            <div style={{
                maxWidth: '600px',
                width: '100%',
                textAlign: 'center',
                marginBottom: '40px'
            }}>
                <h1 style={{
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                    fontWeight: '800',
                    color: '#40e0d0',
                    textTransform: 'uppercase',
                    letterSpacing: '-1px',
                    marginBottom: '10px'
                }}>
                    GET STARTE<span style={{ color: '#ffffff' }}>D</span>
                </h1>
                <p style={{
                    fontSize: '1.2rem',
                    color: 'rgba(255,255,255,0.7)',
                    lineHeight: '1.6'
                }}>
                    Choose how you want to interact with PERSONAI today.
                </p>
            </div>

            <div style={{
                width: '100%',
                maxWidth: '800px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '20px'
            }}>
                {options.map((opt, index) => (
                    <div 
                        key={index}
                        onClick={() => navigate(opt.path)}
                        style={{
                            background: 'rgba(30, 30, 30, 0.4)',
                            border: `1px solid ${opt.color}33`,
                            backdropFilter: 'blur(10px)',
                            padding: '40px 30px',
                            borderRadius: '24px',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            gap: '15px',
                            transition: 'all 0.3s ease',
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-10px)';
                            e.currentTarget.style.background = 'rgba(64, 224, 208, 0.05)';
                            e.currentTarget.style.borderColor = opt.color;
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'none';
                            e.currentTarget.style.background = 'rgba(30,30,30,0.4)';
                            e.currentTarget.style.borderColor = `${opt.color}33`;
                        }}
                    >
                        <span style={{ fontSize: '3rem' }}>{opt.icon}</span>
                        <h2 style={{
                            fontSize: '1.5rem',
                            fontWeight: '700',
                            color: opt.color
                        }}>
                            {opt.title}
                        </h2>
                        <p style={{
                            fontSize: '1rem',
                            color: 'rgba(255,255,255,0.6)',
                            lineHeight: '1.5'
                        }}>
                            {opt.desc}
                        </p>
                    </div>
                ))}
            </div>

            <button
                onClick={() => navigate('/personi')}
                style={{
                    marginTop: '40px',
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255,255,255,0.4)',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    fontSize: '0.9rem'
                }}
            >
                Back to Feature Details
            </button>
        </div>
    );
};

export default AuthSelection;
