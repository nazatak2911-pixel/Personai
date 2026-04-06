import { useLanguage } from '../context/LanguageContext';

const MyPlaceholder = ({ title }: { title: string }) => {
    const { t } = useLanguage();
    
    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            color: '#ffffff',
            textAlign: 'center'
        }}>
            <h1 style={{
                fontSize: '3rem',
                fontWeight: '800',
                color: '#40e0d0',
                marginBottom: '20px',
                textTransform: 'uppercase'
            }}>
                {title}
            </h1>
            <p style={{
                fontSize: '1.2rem',
                color: 'rgba(255,255,255,0.6)',
                maxWidth: '600px'
            }}>
                {t.placeholderDesc}
            </p>
            <div style={{
                marginTop: '40px',
                padding: '20px',
                border: '1px dashed rgba(64, 224, 208, 0.3)',
                borderRadius: '16px',
                color: 'rgba(64, 224, 208, 0.5)'
            }}>
                This section is currently being tailored for your profile.
            </div>
        </div>
    );
};

export default MyPlaceholder;
