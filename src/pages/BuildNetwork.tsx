import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const BuildNetwork = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    
    return (
        <div style={{
            width: '100%',
            height: '100%',
            padding: '60px 40px',
            overflowY: 'auto',
            color: '#ffffff',
            background: 'transparent',
            display: 'flex',
            flexDirection: 'column',
            gap: '30px'
        }}>
            <h1 style={{
                fontSize: '4rem',
                fontWeight: '800',
                color: '#40e0d0',
                textAlign: 'left',
                marginBottom: '10px',
                textTransform: 'uppercase',
                letterSpacing: '-1px'
            }}>
                {t.buildNetwork}
            </h1>

            <div style={{
                position: 'relative',
                width: '100%',
                minHeight: '550px',
                borderRadius: '24px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
            }}>
                {/* Background Image Setup */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: 'url(/network-image.jpeg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    zIndex: 0
                }} />
                
                {/* Dark & Cyan Gradient Overlay for the Cyan Tint */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, rgba(64, 224, 208, 0.4) 0%, rgba(10, 30, 30, 0.9) 100%)',
                    zIndex: 1,
                    mixBlendMode: 'normal'
                }} />

                {/* Sub Box / Text Overlay Content */}
                <div style={{
                    position: 'relative',
                    zIndex: 2,
                    background: 'rgba(30, 30, 30, 0.4)',
                    border: '1px solid rgba(64, 224, 208, 0.2)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    borderRadius: '16px',
                    padding: '40px 50px',
                    maxWidth: '85%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '25px',
                    textAlign: 'center',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)',
                    marginTop: '-40px'
                }}>
                    <p style={{
                        fontSize: '1.6rem',
                        lineHeight: '1.8',
                        color: '#f0f0f0',
                        fontWeight: '400',
                        letterSpacing: '0.5px'
                    }}>
                        {t.networkDesc}
                    </p>
                    
                    {/* Try Now Button */}
                    <button 
                        onClick={() => navigate('/personi')}
                        style={{
                        marginTop: '5px',
                        padding: '12px 36px',
                        background: '#555555',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '50px',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.background = '#666666';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.background = '#555555';
                        e.currentTarget.style.transform = 'none';
                    }}
                    >
                        {t.tryNow}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BuildNetwork;
