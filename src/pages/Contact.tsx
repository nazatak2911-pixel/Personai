import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
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
                {t.contact}
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
                    backgroundImage: 'url(/tint-image.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    zIndex: 0
                }} />
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0,
                    width: '100%', height: '100%',
                    background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(30,30,30,0.6) 100%)',
                    zIndex: 1
                }} />
                <div style={{
                    position: 'relative',
                    zIndex: 2,
                    background: 'rgba(64, 224, 208, 0.1)',
                    border: '2px solid #40e0d0',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    borderRadius: '20px',
                    padding: '50px 60px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    textAlign: 'center',
                    boxShadow: '0 10px 40px rgba(64, 224, 208, 0.3)'
                }}>
                    <div style={{ fontSize: '1.6rem', fontWeight: '500', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <span style={{ color: '#d1d1d1', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '2px' }}>{t.emailHeader}</span>
                        <span style={{ color: '#ffffff', letterSpacing: '0.5px' }}>nazatak2911@gmail.com</span>
                    </div>

                    <div style={{ height: '1px', background: 'rgba(64, 224, 208, 0.3)', width: '80%', margin: '10px auto' }} />

                    <div style={{ fontSize: '1.6rem', fontWeight: '500', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <span style={{ color: '#d1d1d1', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '2px' }}>{t.numberHeader}</span>
                        <span style={{ color: '#ffffff', letterSpacing: '0.5px' }}>+90 5527220443</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
