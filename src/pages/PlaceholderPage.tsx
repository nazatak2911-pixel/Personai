import { useLanguage } from '../context/LanguageContext';

export default function PlaceholderPage({ title }: { title: string }) {
  const { t } = useLanguage();
  return (
    <div style={{ color: 'white', padding: '40px' }}>
        <h1 style={{ color: '#40e0d0', fontSize: '3rem', marginBottom: '20px' }}>{title}</h1>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.6', maxWidth: '800px' }}>
            {t.placeholderDesc}
        </p>
    </div>
  );
}
