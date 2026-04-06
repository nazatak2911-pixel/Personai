import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

const MyHomePage = () => {
    const { t } = useLanguage();
    const { user, updateName } = useAuth();
    const navigate = useNavigate();

    // Only redirect if logged in but strongly confirmed they haven't completed the survey
    useEffect(() => {
        if (user && user.hasCompletedSurvey === false) {
            navigate('/onboarding-survey');
        }
    }, [user, navigate]);

    // Custom markdown renderer
    const renderMarkdown = (text: string) => {
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={index} style={{ color: '#40e0d0' }}>{part.slice(2, -2)}</strong>;
            }
            return <span key={index}>{part}</span>;
        });
    };

    const handleChangeName = () => {
        if (!user) return;
        const newName = window.prompt("Enter your new name:", user.name);
        if (newName && newName.trim().length > 0) {
            updateName(newName.trim());
        }
    };

    const features = [
        {
            title: "PERSONAI",
            desc: t.personaiDesc,
            path: "/mypersonai",
            icon: "🤖",
            color: "#40e0d0",
            image: "/person-image.jpeg"
        },
        {
            title: t.buildNetwork,
            desc: t.networkDesc,
            path: "/mynetwork",
            icon: "🌐",
            color: "#ffffff",
            image: "/network-image.jpeg"
        },
        {
            title: t.myCV,
            desc: t.myCVDesc,
            path: "/mycv",
            icon: "📄",
            color: "#40e0d0",
            image: "/cv-image.jpeg"
        },
        {
            title: t.jobSimulations,
            desc: t.jobSimDesc,
            path: "/mysimulations",
            icon: "⚡",
            color: "#ffffff",
            image: "/job-image.jpeg"
        },
        {
            title: t.internshipOpportunities,
            desc: t.internshipsDesc,
            path: "/myinternships",
            icon: "🎓",
            color: "#40e0d0",
            image: "/intern.jpg"
        }
    ];

    // UNATHENTICATED STATE
    if (!user) {
        return (
            <div style={{
                maxWidth: '1200px', margin: '0 auto', width: '100%', height: '100%',
                padding: '40px', display: 'flex', flexDirection: 'column', 
                alignItems: 'center', justifyContent: 'center', color: '#ffffff'
            }}>
                <h1 style={{ fontSize: '3rem', fontWeight: '800', color: '#40e0d0', textTransform: 'uppercase', marginBottom: '10px' }}>
                    Welcome Trainee
                </h1>
                <h2 style={{ fontSize: '1.5rem', color: 'rgba(255,255,255,0.7)', fontWeight: '400', marginBottom: '30px' }}>
                    You are not signed in.
                </h2>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <button onClick={() => navigate('/login')} style={{
                        background: '#40e0d0', color: '#000', padding: '12px 30px', 
                        borderRadius: '50px', fontSize: '1rem', fontWeight: '600', border: 'none', cursor: 'pointer'
                    }}>
                        Log In
                    </button>
                    <button onClick={() => navigate('/signup')} style={{
                        background: 'transparent', color: '#fff', padding: '12px 30px', 
                        borderRadius: '50px', fontSize: '1rem', fontWeight: '600', 
                        border: '1px solid rgba(255,255,255,0.3)', cursor: 'pointer'
                    }}>
                        Sign Up
                    </button>
                </div>
            </div>
        );
    }

    // AUTHENTICATED STATE
    return (
        <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            width: '100%',
            height: '100%',
            padding: '40px',
            overflowY: 'auto',
            background: 'transparent',
            color: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            gap: '40px'
        }}>
            
            {/* Top Header Row with dynamic WELCOME [NAME] */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <h1 style={{
                        fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                        fontWeight: '800',
                        color: '#40e0d0',
                        textTransform: 'uppercase',
                        letterSpacing: '-1px',
                        margin: 0
                    }}>
                        WELCOME, <span style={{ color: '#ffffff' }}>{user.name}</span>
                    </h1>
                    <button 
                        onClick={handleChangeName}
                        style={{
                            background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.5)',
                            fontSize: '0.85rem', cursor: 'pointer', textDecoration: 'underline', marginTop: '5px'
                        }}
                    >
                        Change Name
                    </button>
                </div>
            </div>

            {/* AI Analysis Results (Text + Chart split layout) */}
            {user.surveyResults && (
                <div style={{
                    background: 'rgba(30, 30, 30, 0.6)',
                    borderRadius: '24px',
                    padding: '40px',
                    border: '1px solid rgba(64, 224, 208, 0.3)',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '30px'
                }}>
                    <div style={{
                        position: 'absolute', top: '-100px', right: '-100px',
                        width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(64, 224, 208, 0.1) 0%, transparent 70%)',
                        zIndex: 0, pointerEvents: 'none'
                    }}/>

                    {/* Shared Top Actions of the Block */}
                    <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '15px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <span style={{ fontSize: '2.5rem' }}>🧠</span>
                            <h2 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.5px', margin: 0 }}>
                                Your AI Career Profile
                            </h2>
                        </div>
                        <button
                            onClick={() => navigate('/onboarding-survey')}
                            style={{
                                background: 'transparent',
                                border: '1px solid #40e0d0',
                                color: '#40e0d0',
                                padding: '10px 20px',
                                borderRadius: '50px',
                                fontSize: '0.9rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                fontFamily: 'Outfit, sans-serif',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px'
                            }}
                            onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(64,224,208,0.1)'; }}
                            onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; }}
                        >
                            ↻ Retake Test
                        </button>
                    </div>

                    {/* 2-Column Split: Markdown Left, Chart Right */}
                    <div style={{ 
                        position: 'relative', zIndex: 1, 
                        display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(300px, 1fr)', gap: '40px',
                        alignItems: 'start' 
                    }}>
                        {/* LEFT COLUMN: Markdown Text */}
                        <div style={{
                            fontSize: '0.95rem',
                            lineHeight: '1.6',
                            color: 'rgba(255,255,255,0.85)',
                            whiteSpace: 'pre-wrap',
                            letterSpacing: '0.3px',
                            maxHeight: '400px',
                            overflowY: 'auto',
                            paddingRight: '15px',
                            borderRight: '1px solid rgba(255,255,255,0.1)'
                        }}>
                            {user.surveyResults ? renderMarkdown(user.surveyResults) : "Analyzing your profile..."}
                        </div>

                        {/* RIGHT COLUMN: Custom CSS Bar Chart for Career Affinity */}
                        {user.affinityScores && (
                            <div style={{ paddingLeft: '10px' }}>
                                <h3 style={{ fontSize: '1.1rem', color: '#40e0d0', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                    Inclination Summary
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    {Object.entries(user.affinityScores).map(([trait, score]) => (
                                        <div key={trait} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                            <div style={{ width: '90px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', fontWeight: '500', textTransform: 'uppercase' }}>
                                                {trait}
                                            </div>
                                            <div style={{ flex: 1, background: 'rgba(255,255,255,0.1)', height: '14px', borderRadius: '7px', overflow: 'hidden' }}>
                                                <div style={{ 
                                                    width: `${Math.max(5, score)}%`, height: '100%', 
                                                    background: 'linear-gradient(90deg, #2a9d8f, #40e0d0)',
                                                    borderRadius: '7px', transition: 'width 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                                                }} />
                                            </div>
                                            <div style={{ width: '40px', fontSize: '0.9rem', color: '#40e0d0', fontWeight: 'bold', textAlign: 'right' }}>
                                                {Math.round(score)}%
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Bottom Section: Squeezed Features Grid (Pushed to bottom) */}
            <div style={{ marginTop: 'auto' }}>
                <div style={{ height: '30px' }} /> {/* A small buffer if content gets close */}
                <h3 style={{ 
                    fontSize: '1.4rem', color: '#40e0d0', fontWeight: '600', 
                    marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px' 
                }}>
                    Explore Modules
                </h3>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, 1fr)',
                    gap: '15px',
                    width: '100%'
                }}>
                    {features.map((feat, index) => (
                        <div 
                            key={index}
                            onClick={() => navigate(feat.path)}
                            style={{
                                position: 'relative',
                                height: '160px',
                                borderRadius: '16px',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-end',
                                padding: '20px',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
                                border: '1px solid rgba(255,255,255,0.1)'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = 'translateY(-3px)';
                                e.currentTarget.style.boxShadow = '0 10px 25px rgba(64, 224, 208, 0.15)';
                                e.currentTarget.style.borderColor = 'rgba(64, 224, 208, 0.3)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = 'none';
                                e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                            }}
                        >
                            {/* Background Image Overlay */}
                            <div style={{
                                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                                backgroundImage: `url(${feat.image})`, backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0
                            }} />
                            <div style={{
                                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                                background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 60%, transparent 100%)', zIndex: 1
                            }} />

                            {/* Content */}
                            <div style={{ position: 'relative', zIndex: 2 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                    <span style={{ fontSize: '1.2rem' }}>{feat.icon}</span>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: feat.color, margin: 0, textTransform: 'uppercase' }}>
                                        {feat.title}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyHomePage;
