import { useLanguage } from '../context/LanguageContext';

const Demo = () => {
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
                {t.demo}
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
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0,
                    width: '100%', height: '100%',
                    backgroundImage: 'url(/demo-image.jpeg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    zIndex: 0
                }} />
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0,
                    width: '100%', height: '100%',
                    background: 'linear-gradient(135deg, rgba(64, 224, 208, 0.4) 0%, rgba(10, 30, 30, 0.9) 100%)',
                    zIndex: 1,
                    mixBlendMode: 'normal'
                }} />

                <div style={{
                    position: 'relative',
                    zIndex: 2,
                    background: 'transparent',
                    border: 'none',
                    padding: '40px 50px',
                    maxWidth: '85%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '20px',
                    textAlign: 'left',
                    marginTop: '-40px'
                }}>
                    <p style={{
                        fontSize: '1.4rem',
                        lineHeight: '1.8',
                        color: '#f0f0f0',
                        fontWeight: '400',
                        letterSpacing: '0.5px'
                    }}>
                        {t.demoDesc}
                    </p>
                    <ul style={{
                        width: '100%',
                        fontSize: '1.4rem',
                        lineHeight: '1.8',
                        color: '#f0f0f0',
                        fontWeight: '400',
                        letterSpacing: '0.5px',
                        paddingLeft: '40px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px'
                    }}>
                        <li>{t.demoList1}</li>
                        <li>{t.demoList2}</li>
                        <li>{t.demoList3}</li>
                    </ul>
                    <p style={{
                        width: '100%',
                        fontSize: '1.2rem',
                        lineHeight: '1.6',
                        color: '#b0b0b0',
                        fontWeight: '400',
                        letterSpacing: '0.5px',
                        fontStyle: 'italic',
                        marginTop: '10px'
                    }}>
                        {t.demoNote}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Demo;
