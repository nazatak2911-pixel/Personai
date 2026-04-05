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
                    <h2 style={{ color: '#40e0d0', fontSize: '1.8rem', marginBottom: '15px' }}>1. Introduction</h2>
                    <p style={{ lineHeight: '1.6', fontSize: '1.1rem', opacity: '0.9' }}>
                        This Privacy Policy explains how our artificial intelligence application ("the Application", "we", "our", or "us") collects, uses, stores, and protects information when used by individuals under the age of 18 ("minors", "children", or "users"). We are committed to protecting the privacy, safety, and rights of minors and ensuring that all data is handled ethically, securely, and responsibly.
                    </p>
                    <p style={{ lineHeight: '1.6', fontSize: '1.1rem', opacity: '0.9', marginTop: '10px' }}>
                        By using the Application, users and their parents or legal guardians acknowledge and agree to the practices described in this Privacy Policy.
                    </p>
                </section>

                <section>
                    <h2 style={{ color: '#40e0d0', fontSize: '1.8rem', marginBottom: '15px' }}>2. Our Commitment to Protecting Minors</h2>
                    <p style={{ lineHeight: '1.6', fontSize: '1.1rem', opacity: '0.9' }}>
                        Because this Application is designed specifically for minors, we follow strict privacy-by-design and privacy-by-default principles. This means:
                    </p>
                    <ul style={{ listStyle: 'none', padding: '10px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <li>• We collect the minimum amount of data necessary.</li>
                        <li>• We anonymize data whenever possible.</li>
                        <li>• We do not sell personal data.</li>
                        <li>• We do not use data for targeted advertising.</li>
                        <li>• We prioritize safety, confidentiality, and ethical data use.</li>
                        <li>• We comply with applicable child data protection laws such as GDPR (UK/EU), COPPA (US where applicable), and other relevant regulations.</li>
                    </ul>
                </section>

                <section>
                    <h2 style={{ color: '#40e0d0', fontSize: '1.8rem', marginBottom: '15px' }}>3. Information We Collect</h2>
                    <p style={{ lineHeight: '1.6', fontSize: '1.1rem', opacity: '0.9' }}>
                        We aim to collect as little personal information as possible. The types of data we may collect include:
                    </p>
                    <div style={{ marginTop: '15px' }}>
                        <h3 style={{ color: '#40e0d0', fontSize: '1.3rem', marginBottom: '10px' }}>3.1 Non-Personal Information</h3>
                        <p style={{ opacity: '0.8', marginBottom: '10px' }}>This may include:</p>
                        <ul style={{ listStyle: 'none', paddingLeft: '10px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <li>• Device type</li>
                            <li>• Operating system</li>
                            <li>• App usage statistics</li>
                            <li>• Interaction data with the AI</li>
                            <li>• Error logs</li>
                            <li>• General location (country level only, not precise location)</li>
                        </ul>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <h3 style={{ color: '#40e0d0', fontSize: '1.3rem', marginBottom: '10px' }}>3.2 User-Provided Information</h3>
                        <p style={{ opacity: '0.8', marginBottom: '10px' }}>Users may voluntarily provide information when interacting with the AI, such as:</p>
                        <ul style={{ listStyle: 'none', paddingLeft: '10px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <li>• Messages</li>
                            <li>• Questions</li>
                            <li>• Educational content</li>
                            <li>• Feedback</li>
                        </ul>
                    </div>
                </section>

                <section>
                    <h2 style={{ color: '#40e0d0', fontSize: '1.8rem', marginBottom: '15px' }}>4. Data Anonymization</h2>
                    <p style={{ lineHeight: '1.6', fontSize: '1.1rem', opacity: '0.9' }}>All stored data is anonymized whenever possible. This means:</p>
                    <ul style={{ listStyle: 'none', padding: '10px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <li>• Names are removed or replaced with random identifiers.</li>
                        <li>• IP addresses are truncated or anonymized.</li>
                        <li>• Conversations are stored without identifiable information.</li>
                        <li>• Any accidental personal data is filtered or deleted.</li>
                        <li>• Data cannot be traced back to an individual user.</li>
                    </ul>
                </section>

                <section>
                    <h2 style={{ color: '#40e0d0', fontSize: '1.8rem', marginBottom: '15px' }}>5. How We Use the Data</h2>
                    <p style={{ lineHeight: '1.6', fontSize: '1.1rem', opacity: '0.9' }}>We use collected data only for the following purposes:</p>
                    <ul style={{ listStyle: 'none', padding: '10px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <li>• Improving AI responses</li>
                        <li>• Improving safety systems</li>
                        <li>• Fixing bugs and technical issues</li>
                        <li>• Educational research and system improvement</li>
                        <li>• Preventing harmful or unsafe use</li>
                        <li>• Monitoring system performance</li>
                        <li>• Training AI models on anonymized data only</li>
                    </ul>
                </section>

                <section>
                    <h2 style={{ color: '#40e0d0', fontSize: '1.8rem', marginBottom: '15px' }}>6. Data Storage and Security</h2>
                    <p style={{ lineHeight: '1.6', fontSize: '1.1rem', opacity: '0.9' }}>We take data security very seriously. Data is protected using:</p>
                    <ul style={{ listStyle: 'none', padding: '10px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <li>• Encryption in transit and at rest</li>
                        <li>• Secure servers</li>
                        <li>• Access control and authentication</li>
                        <li>• Limited employee access</li>
                        <li>• Security monitoring</li>
                        <li>• Regular security audits</li>
                        <li>• Data minimization policies</li>
                    </ul>
                </section>

                <section>
                    <h2 style={{ color: '#40e0d0', fontSize: '1.8rem', marginBottom: '15px' }}>7. Data Retention</h2>
                    <p style={{ lineHeight: '1.6', fontSize: '1.1rem', opacity: '0.9' }}>
                        We only store data for as long as necessary to improve and maintain the Application.
                    </p>
                    <ul style={{ listStyle: 'none', padding: '10px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <li>• Temporary logs may be deleted automatically.</li>
                        <li>• Anonymized conversation data may be stored for research and improvement.</li>
                        <li>• Users or parents may request deletion of data at any time.</li>
                        <li>• When data is no longer needed, it is securely deleted.</li>
                    </ul>
                </section>

                <section>
                    <h2 style={{ color: '#40e0d0', fontSize: '1.8rem', marginBottom: '15px' }}>8. Parental Rights and Control</h2>
                    <p style={{ lineHeight: '1.6', fontSize: '1.1rem', opacity: '0.9' }}>
                        Parents or legal guardians have the right to request access, deletion, or correction of stored data.
                    </p>
                </section>

                <section>
                    <h2 style={{ color: '#40e0d0', fontSize: '1.8rem', marginBottom: '15px' }}>9. Third-Party Services</h2>
                    <p style={{ lineHeight: '1.6', fontSize: '1.1rem', opacity: '0.9' }}>
                        We do not sell or share personal data with third parties. We may use secure third-party services for cloud storage, security monitoring, and infrastructure hosting, all compliant with strict data protection standards.
                    </p>
                </section>

                <section>
                    <h2 style={{ color: '#40e0d0', fontSize: '1.8rem', marginBottom: '15px' }}>10. Safety and Moderation</h2>
                    <p style={{ lineHeight: '1.6', fontSize: '1.1rem', opacity: '0.9' }}>
                        To protect minors, the Application may automatically monitor content to detect harmful content, bullying, or inappropriate interactions.
                    </p>
                </section>

                <section>
                    <h2 style={{ color: '#40e0d0', fontSize: '1.8rem', marginBottom: '15px' }}>11. Children's Privacy Protection Principles</h2>
                    <p style={{ lineHeight: '1.6', fontSize: '1.1rem', opacity: '0.9' }}>
                        Our system is built on ethical principles including data minimization, anonymity by default, and safety over data collection.
                    </p>
                </section>

                <section>
                    <h2 style={{ color: '#40e0d0', fontSize: '1.8rem', marginBottom: '15px' }}>12. Changes to This Privacy Policy</h2>
                    <p style={{ lineHeight: '1.6', fontSize: '1.1rem', opacity: '0.9' }}>
                        We may update this Privacy Policy from time to time. Continued use of the Application after changes means acceptance of the updated policy.
                    </p>
                </section>

                <section>
                    <h2 style={{ color: '#40e0d0', fontSize: '1.8rem', marginBottom: '15px' }}>13. {t.contact}</h2>
                    <p style={{ lineHeight: '1.6', fontSize: '1.1rem', opacity: '0.9' }}>
                        If you have any questions, please contact us at nazatak2911@gmail.com.
                    </p>
                </section>

                <section style={{
                    background: 'rgba(64, 224, 208, 0.05)',
                    padding: '30px',
                    borderRadius: '20px',
                    border: '1px solid rgba(64, 224, 208, 0.1)'
                }}>
                    <h2 style={{ color: '#40e0d0', fontSize: '1.8rem', marginBottom: '15px' }}>14. Summary</h2>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <li>• We collect very little data.</li>
                        <li>• We anonymize stored data.</li>
                        <li>• We do not sell data.</li>
                        <li>• We do not show targeted ads.</li>
                        <li>• Parents can request deletion.</li>
                        <li>• Data is encrypted and secure.</li>
                        <li>• The system is designed to protect minors.</li>
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default Privacy;
