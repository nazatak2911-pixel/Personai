import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

const MyHomePage = () => {
    const { t } = useLanguage();
    const { user } = useAuth();
    const navigate = useNavigate();

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

    return (
        <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            width: '100%',
            height: '100%',
            padding: '40px',
            overflowY: 'auto',
            background: 'transparent',
            color: '#ffffff'
        }}>
            <div style={{ marginBottom: '40px' }}>
                <h1 style={{
                    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                    fontWeight: '800',
                    color: '#40e0d0',
                    textTransform: 'uppercase',
                    letterSpacing: '-1px',
                    marginBottom: '10px'
                }}>
                    WELCOME BACK, <span style={{ color: '#ffffff' }}>{user?.name || 'TRAINEE'}</span>
                </h1>
                <p style={{
                    fontSize: '1.2rem',
                    color: 'rgba(255,255,255,0.6)',
                    fontWeight: '300'
                }}>
                    Select a module to continue your career journey.
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '25px',
                width: '100%'
            }}>
                {features.map((feat, index) => (
                    <div 
                        key={index}
                        onClick={() => navigate(feat.path)}
                        style={{
                            position: 'relative',
                            height: '240px',
                            borderRadius: '24px',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            padding: '25px',
                            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'scale(1.02) translateY(-5px)';
                            e.currentTarget.style.boxShadow = '0 20px 40px rgba(64, 224, 208, 0.15)';
                            e.currentTarget.style.borderColor = 'rgba(64, 224, 208, 0.3)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'none';
                            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                        }}
                    >
                        {/* Background Image Overlay */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundImage: `url(${feat.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            zIndex: 0
                        }} />
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
                            zIndex: 1
                        }} />

                        {/* Content */}
                        <div style={{ position: 'relative', zIndex: 2 }}>
                            <div style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '10px',
                                marginBottom: '8px'
                            }}>
                                <span style={{ fontSize: '1.5rem' }}>{feat.icon}</span>
                                <h3 style={{
                                    fontSize: '1.4rem',
                                    fontWeight: '700',
                                    color: feat.color,
                                    margin: 0,
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px'
                                }}>
                                    {feat.title}
                                </h3>
                            </div>
                            <p style={{
                                fontSize: '0.9rem',
                                color: 'rgba(255,255,255,0.7)',
                                lineHeight: '1.4',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                margin: 0
                            }}>
                                {feat.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyHomePage;
