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
        const newName = window.prompt(t.enterNewName, user.name);
        if (newName && newName.trim().length > 0) {
            updateName(newName.trim());
        }
    };

    const features = [
        { title: "PERSONAI", desc: t.personaiDesc, path: "/mypersonai", icon: "🤖", color: "#40e0d0", image: "/person-image.jpeg" },
        { title: t.buildNetwork, desc: t.networkDesc, path: "/mynetwork", icon: "🌐", color: "#ffffff", image: "/network-image.jpeg" },
        { title: t.myCV, desc: t.myCVDesc, path: "/mycv", icon: "📄", color: "#40e0d0", image: "/cv-image.jpeg" },
        { title: t.jobSimulations, desc: t.jobSimDesc, path: "/mysimulations", icon: "⚡", color: "#ffffff", image: "/job-image.jpeg" },
        { title: t.internshipOpportunities, desc: t.internshipsDesc, path: "/myinternships", icon: "🎓", color: "#40e0d0", image: "/intern.jpg" }
    ];

    // UNATHENTICATED STATE
    if (!user) {
        return (
            <div style={{
                maxWidth: '1200px', margin: '0 auto', width: '100%', height: '100%',
                padding: '40px', display: 'flex', flexDirection: 'column', 
                alignItems: 'center', justifyContent: 'center', color: '#ffffff',
                overflow: 'hidden'
            }}>
                <h1 style={{ fontSize: '3rem', fontWeight: '800', color: '#40e0d0', textTransform: 'uppercase', marginBottom: '10px' }}>
                    {t.welcomeTrainee}
                </h1>
                <h2 style={{ fontSize: '1.5rem', color: 'rgba(255,255,255,0.7)', fontWeight: '400', marginBottom: '30px' }}>
                    {t.notSignedIn}
                </h2>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <button onClick={() => navigate('/login')} style={{
                        background: '#40e0d0', color: '#000', padding: '12px 30px', 
                        borderRadius: '50px', fontSize: '1rem', fontWeight: '600', border: 'none', cursor: 'pointer'
                    }}>
                        {t.logIn}
                    </button>
                    <button onClick={() => navigate('/signup')} style={{
                        background: 'transparent', color: '#fff', padding: '12px 30px', 
                        borderRadius: '50px', fontSize: '1rem', fontWeight: '600', 
                        border: '1px solid rgba(255,255,255,0.3)', cursor: 'pointer'
                    }}>
                        {t.signUp}
                    </button>
                </div>
            </div>
        );
    }

    // CHART FALLBACK FOR OLDER USERS
    const scores = user.affinityScores || { Analytical: 70, Creative: 60, Social: 80, Leadership: 50, Technical: 65 };

    // AUTHENTICATED STATE
    return (
        <div style={{
            maxWidth: '1300px',
            margin: '0 auto',
            width: '100%',
            height: '100%', // Bound strictly to screen
            padding: '30px',
            overflow: 'hidden', // Page strictly no-scroll
            background: 'transparent',
            color: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            gap: '30px' // Tighter gap
        }}>
            {/* Top Analysis + Welcome + Chart Container */}
            {user.surveyResults && (
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'minmax(0, 1.4fr) minmax(320px, 1fr)', 
                    gap: '40px',
                    width: '100%',
                    flex: 1, // Take all available space
                    minHeight: 0 // Crucial for Firefox flexbox scroll
                }}>
                    
                    {/* LEFT COLUMN: Scrollable Dark Box */}
                    <div style={{
                        background: 'rgba(30,30,30,0.6)',
                        borderRadius: '32px',
                        padding: '40px',
                        border: '1px solid rgba(64,224,208,0.3)',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%', // Stretch to fill Grid Row
                        overflow: 'hidden' // So internal children can scroll
                    }}>
                        <div style={{
                            position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', 
                            background: 'radial-gradient(circle, rgba(64,224,208,0.1) 0%, transparent 70%)',
                            zIndex: 0, pointerEvents: 'none'
                        }}/>

                        {/* Box Header */}
                        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexShrink: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <span style={{ fontSize: '2.5rem' }}>🧠</span>
                                <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#fff', textTransform: 'uppercase', letterSpacing: '-0.5px', margin: 0 }}>
                                    {t.yourAIProfile}
                                </h2>
                            </div>
                        </div>

                        {/* SCROLLING TEXT CONTENT DEFINITIVELY */}
                        <div style={{
                            position: 'relative', zIndex: 1,
                            fontSize: '0.95rem',
                            lineHeight: '1.6',
                            color: 'rgba(255,255,255,0.85)',
                            whiteSpace: 'pre-wrap',
                            letterSpacing: '0.3px',
                            overflowY: 'auto', // Independent scrolling
                            flex: 1, // Fills Box completely
                            paddingRight: '15px'
                        }}>
                            {renderMarkdown(user.surveyResults)}
                        </div>
                    </div>


                    {/* RIGHT COLUMN: Welcome Header + Floating Chart Fixed */}
                    <div style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        height: '100%', 
                        justifyContent: 'space-between',
                        paddingTop: '10px'
                    }}>
                        
                        {/* Welcome Right Aligned */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', width: '100%', marginBottom: '20px' }}>
                            <h1 style={{
                                fontSize: 'clamp(2rem, 3.5vw, 2.5rem)', fontWeight: '800', color: '#40e0d0',
                                textTransform: 'uppercase', letterSpacing: '-1px', margin: 0, textAlign: 'right'
                            }}>
                                {t.welcomeCaps}, <span style={{ color: '#ffffff' }}>{user.name}</span>
                            </h1>
                            <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                                <button onClick={handleChangeName} style={{
                                    background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.5)',
                                    fontSize: '0.85rem', cursor: 'pointer', textDecoration: 'underline'
                                }}>
                                    {t.changeName}
                                </button>
                                <button onClick={() => navigate('/onboarding-survey')} style={{
                                    background: 'transparent', border: '1px solid #40e0d0', color: '#40e0d0',
                                    padding: '4px 12px', borderRadius: '50px', fontSize: '0.8rem', fontWeight: '600',
                                    cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center'
                                }}>
                                    ↻ {t.retake}
                                </button>
                            </div>
                        </div>

                        {/* Chart Subtly Floating Right */}
                        <div style={{ 
                            padding: '30px', background: 'rgba(0,0,0,0.2)', borderRadius: '24px', 
                            border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column'
                        }}>
                            <h3 style={{ fontSize: '1.2rem', color: '#40e0d0', marginBottom: '25px', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'center' }}>
                                {t.inclinationSummary}
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                                {Object.entries(scores).map(([trait, score]) => (
                                    <div key={trait} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <div style={{ width: '90px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', fontWeight: '500', textTransform: 'uppercase' }}>
                                            {trait}
                                        </div>
                                        <div style={{ flex: 1, background: 'rgba(255,255,255,0.1)', height: '14px', borderRadius: '7px', overflow: 'hidden' }}>
                                            <div style={{ 
                                                width: `${Math.max(5, score)}%`, height: '100%', background: 'linear-gradient(90deg, #2a9d8f, #40e0d0)',
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

                    </div>
                </div>
            )}

            {/* Bottom Section: Squeezed Features Grid (Fixed low flex-shrink) */}
            <div style={{ 
                flexShrink: 0, // Prevents the grid from being smushed by the top stretching
                marginBottom: '10px'
            }}>
                <h3 style={{ fontSize: '1.4rem', color: '#40e0d0', fontWeight: '600', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {t.exploreModules}
                </h3>
                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px', width: '100%'
                }}>
                    {features.map((feat, index) => (
                        <div 
                            key={index}
                            onClick={() => navigate(feat.path)}
                            style={{
                                position: 'relative', height: '140px', borderRadius: '16px', overflow: 'hidden', cursor: 'pointer',
                                display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '15px',
                                transition: 'all 0.3s ease', boxShadow: '0 5px 15px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = 'translateY(-3px)';
                                e.currentTarget.style.boxShadow = '0 10px 25px rgba(64,224,208,0.15)';
                                e.currentTarget.style.borderColor = 'rgba(64,224,208,0.3)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = 'none';
                                e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                            }}
                        >
                            <div style={{
                                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                                backgroundImage: `url(${feat.image})`, backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0
                            }} />
                            <div style={{
                                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                                background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 60%, transparent 100%)', zIndex: 1
                            }} />
                            <div style={{ position: 'relative', zIndex: 2 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                    <span style={{ fontSize: '1.2rem' }}>{feat.icon}</span>
                                    <h3 style={{ fontSize: '1rem', fontWeight: '700', color: feat.color, margin: 0, textTransform: 'uppercase' }}>
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
