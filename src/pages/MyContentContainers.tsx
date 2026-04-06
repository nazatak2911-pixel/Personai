import { useLanguage } from '../context/LanguageContext';

export const MyAboutUs = () => {
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

export const MyContact = () => {
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

export const MyFaq = () => {
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
                How to Use
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
                    backgroundImage: 'url(/how-image.jpeg)',
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
                        fontSize: '1.4rem',
                        lineHeight: '1.8',
                        color: '#f0f0f0',
                        fontWeight: '400',
                        letterSpacing: '0.5px'
                    }}>
                        {t.howToUseDesc}
                    </p>
                </div>
            </div>
        </div>
    );
};

export const MyPrivacy = () => {
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
                marginBottom: '20px',
                textTransform: 'uppercase',
                letterSpacing: '-1px'
            }}>
                {t.privacyPolicy}
            </h1>

            <div style={{ maxWidth: '900px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
                <section style={{
                    background: 'rgba(64, 224, 208, 0.05)',
                    padding: '30px',
                    borderRadius: '20px',
                    border: '1px solid rgba(64, 224, 208, 0.15)'
                }}>
                    <p style={{ lineHeight: '1.8', fontSize: '1.15rem', opacity: '0.9' }}>
                        {t.privacyPolicyContent}
                    </p>
                </section>
                <section>
                    <h2 style={{ color: '#40e0d0', fontSize: '1.8rem', marginBottom: '15px' }}>1. Introduction</h2>
                    <p style={{ lineHeight: '1.6', fontSize: '1.1rem', opacity: '0.9' }}>
                        This Privacy Policy explains how our artificial intelligence application collects information.
                    </p>
                    <p style={{ lineHeight: '1.6', fontSize: '1.1rem', opacity: '0.9', marginTop: '10px' }}>
                        Compliance with applicable child data protection laws is our priority.
                    </p>
                </section>
            </div>
        </div>
    );
};

export const MyDemo = () => {
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
                </div>
            </div>
        </div>
    );
};
