import { useLanguage } from '../context/LanguageContext';

const AboutUs = () => {
    const { t } = useLanguage();
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
                {t.aboutUs}
            </h1>

            <div style={{
                position: 'relative',
                width: '100%',
                minHeight: '500px',
                borderRadius: '24px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0,
                    width: '100%', height: '100%',
                    backgroundImage: 'url(/about-image.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    zIndex: 0
                }} />
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0,
                    width: '100%', height: '100%',
                    background: 'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(30,30,30,0.6) 100%)',
                    zIndex: 1
                }} />
                <div style={{
                    position: 'relative',
                    zIndex: 2,
                    maxWidth: '850px',
                    padding: '40px',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                }}>
                    <p style={{
                        fontSize: '1.4rem',
                        lineHeight: '1.8',
                        color: '#d1d1d1',
                        fontWeight: '400',
                        letterSpacing: '0.5px'
                    }}>
                        {t.aboutUsP1}
                    </p>
                    <p style={{
                        fontSize: '1.4rem',
                        lineHeight: '1.8',
                        color: '#d1d1d1',
                        fontWeight: '400',
                        letterSpacing: '0.5px'
                    }}>
                        {t.aboutUsP2}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
