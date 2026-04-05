import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Home() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="vertical-text-wrapper">
      <h1 className="vertical-slogan">
        <span className="white-text">{t.the}</span><br />
        <span className="white-text">{t.future}</span><br />
        {t.starts}<br />
        {t.today}
      </h1>
      <div className="hero-image-container">
        <img src="/hero-image.png" alt="PersonaAI Vision" className="hero-image" />
        <button onClick={() => navigate('/about')} className="logo-overlay-btn">
          {t.aboutUsBtn}
        </button>
      </div>
    </div>
  );
}
