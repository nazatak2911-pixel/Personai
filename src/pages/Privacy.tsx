import { useLanguage } from '../context/LanguageContext';

const Privacy = () => {
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
                {/* Summary intro using translated content */}
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
                    <h2 style={{ color: '#40e0d0', fontSize: '1.8rem', marginBottom: '15px' }}>{t.privacySection1Title}</h2>
                    <p style={{ lineHeight: '1.6', fontSize: '1.1rem', opacity: '0.9' }}>
                        {t.privacySection1Content}
                    </p>
                </section>

                <section>
                    <h2 style={{ color: '#40e0d0', fontSize: '1.8rem', marginBottom: '15px' }}>{t.privacySection2Title}</h2>
                    <p style={{ lineHeight: '1.6', fontSize: '1.1rem', opacity: '0.9' }}>
                        {t.privacySection2Content}
                    </p>
                </section>

                <section>
                    <h2 style={{ color: '#40e0d0', fontSize: '1.8rem', marginBottom: '15px' }}>{t.privacySection3Title}</h2>
                    <p style={{ lineHeight: '1.6', fontSize: '1.1rem', opacity: '0.9' }}>
                        {t.privacySection3Content}
                    </p>
                </section>

                <section>
                    <h2 style={{ color: '#40e0d0', fontSize: '1.8rem', marginBottom: '15px' }}>{t.privacySection4Title}</h2>
                    <p style={{ lineHeight: '1.6', fontSize: '1.1rem', opacity: '0.9' }}>{t.privacySection4Content}</p>
                </section>

                <section>
                    <h2 style={{ color: '#40e0d0', fontSize: '1.8rem', marginBottom: '15px' }}>{t.privacySection5Title}</h2>
                    <p style={{ lineHeight: '1.6', fontSize: '1.1rem', opacity: '0.9' }}>{t.privacySection5Content}</p>
                </section>

                <section>
                    <h2 style={{ color: '#40e0d0', fontSize: '1.8rem', marginBottom: '15px' }}>{t.privacySection6Title}</h2>
                    <p style={{ lineHeight: '1.6', fontSize: '1.1rem', opacity: '0.9' }}>{t.privacySection6Content}</p>
                </section>

                <section>
                    <h2 style={{ color: '#40e0d0', fontSize: '1.8rem', marginBottom: '15px' }}>{t.privacySection7Title}</h2>
                    <p style={{ lineHeight: '1.6', fontSize: '1.1rem', opacity: '0.9' }}>
                        {t.privacySection7Content}
                    </p>
                </section>

                <section>
                    <h2 style={{ color: '#40e0d0', fontSize: '1.8rem', marginBottom: '15px' }}>{t.privacySection8Title}</h2>
                    <p style={{ lineHeight: '1.6', fontSize: '1.1rem', opacity: '0.9' }}>
                        {t.privacySection8Content}
                    </p>
                </section>

                <section>
                    <h2 style={{ color: '#40e0d0', fontSize: '1.8rem', marginBottom: '15px' }}>{t.privacySection9Title}</h2>
                    <p style={{ lineHeight: '1.6', fontSize: '1.1rem', opacity: '0.9' }}>
                        {t.privacySection9Content}
                    </p>
                </section>

                <section>
                    <h2 style={{ color: '#40e0d0', fontSize: '1.8rem', marginBottom: '15px' }}>{t.privacySection10Title}</h2>
                    <p style={{ lineHeight: '1.6', fontSize: '1.1rem', opacity: '0.9' }}>
                        {t.privacySection10Content}
                    </p>
                </section>

                <section>
                    <h2 style={{ color: '#40e0d0', fontSize: '1.8rem', marginBottom: '15px' }}>{t.privacySection11Title}</h2>
                    <p style={{ lineHeight: '1.6', fontSize: '1.1rem', opacity: '0.9' }}>
                        {t.privacySection11Content}
                    </p>
                </section>

                <section>
                    <h2 style={{ color: '#40e0d0', fontSize: '1.8rem', marginBottom: '15px' }}>{t.privacySection12Title}</h2>
                    <p style={{ lineHeight: '1.6', fontSize: '1.1rem', opacity: '0.9' }}>
                        {t.privacySection12Content}
                    </p>
                </section>

                <section>
                    <h2 style={{ color: '#40e0d0', fontSize: '1.8rem', marginBottom: '15px' }}>{t.privacySection13Title}</h2>
                    <p style={{ lineHeight: '1.6', fontSize: '1.1rem', opacity: '0.9' }}>
                        {t.privacySection13Content}
                    </p>
                </section>

                <section style={{
                    background: 'rgba(64, 224, 208, 0.05)',
                    padding: '30px',
                    borderRadius: '20px',
                    border: '1px solid rgba(64, 224, 208, 0.1)'
                }}>
                    <h2 style={{ color: '#40e0d0', fontSize: '1.8rem', marginBottom: '15px' }}>{t.privacySection14Title}</h2>
                    <p style={{ lineHeight: '1.6', fontSize: '1.1rem', opacity: '0.9' }}>
                        {t.privacySection14Content}
                    </p>
                </section>
            </div>
        </div>
    );
};

export default Privacy;
