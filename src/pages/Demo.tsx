
const Demo = () => {
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
                Demo
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
                    backgroundImage: 'url(/demo-image.jpeg)',
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
                    gap: '20px',
                    textAlign: 'left', /* Left aligned to make lists look good */
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
                        Our website is currently being innovated and developed. Unfortunately due to the fact that this isn’t our final version some features may not be able to function properly and some features are not available at the moment. The features which are not available at the moment are:
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
                        <li>VR adjustment for job simulations</li>
                        <li>Graphic demonstrations for job simulations</li>
                        <li>Actual internship postings</li>
                    </ul>
                    <p style={{
                        width: '100%',
                        fontSize: '1.2rem',
                        lineHeight: '1.6',
                        color: '#b0b0b0', /* Slightly dimmer for the parenthetical note */
                        fontWeight: '400',
                        letterSpacing: '0.5px',
                        fontStyle: 'italic',
                        marginTop: '10px'
                    }}>
                        (Build my network may not function properly since there are no users submitting their stories except for our team members)
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Demo;
