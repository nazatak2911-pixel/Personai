import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Home() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div style={{
      width: '100%',
      minHeight: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
    }}>
      {/* ── Hero Section ── */}
      <div className="vertical-text-wrapper" style={{ minHeight: 'calc(100vh - 70px)', flexShrink: 0 }}>
        <h1 className="vertical-slogan">
          <span className="white-text">{t.the}</span><br />
          <span className="white-text">{t.future}</span><br />
          {t.starts}<br />
          {t.today}
        </h1>
        <div className="hero-image-container">
          <img src="/hero-image.png" alt="PersonaAI Vision" className="hero-image" />
        </div>
      </div>

      {/* ── About Us Section ── */}
      <div style={{
        width: '100%',
        padding: '60px 60px 20px 60px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '32px',
      }}>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          fontWeight: '800',
          color: '#40e0d0',
          textTransform: 'uppercase',
          letterSpacing: '-1px',
          textAlign: 'center',
          marginBottom: '0',
        }}>
          {t.aboutUs}
        </h2>

        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1000px',
          minHeight: '400px',
          borderRadius: '24px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
        }}>
          {/* background image */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, width: '100%', height: '100%',
            backgroundImage: 'url(/about-image.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0,
          }} />
          {/* overlay */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, width: '100%', height: '100%',
            background: 'linear-gradient(135deg, rgba(0,0,0,0.88) 0%, rgba(30,30,30,0.65) 100%)',
            zIndex: 1,
          }} />
          {/* text */}
          <div style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: '820px',
            padding: '50px 40px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
          }}>
            <p style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
              lineHeight: '1.85',
              color: '#d1d1d1',
              fontWeight: '400',
              letterSpacing: '0.3px',
            }}>
              {t.aboutUsP1}
            </p>
            <p style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
              lineHeight: '1.85',
              color: '#d1d1d1',
              fontWeight: '400',
              letterSpacing: '0.3px',
            }}>
              {t.aboutUsP2}
            </p>
          </div>
        </div>

        {/* ── Try Out Button ── */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          padding: '20px 0 60px 0',
        }}>
          <p style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '1rem',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            fontWeight: '500',
          }}>
            {t.tryNow}
          </p>
          <button
            onClick={() => navigate('/auth-selection')}
            style={{
              background: 'linear-gradient(135deg, #40e0d0 0%, #2cb8aa 100%)',
              color: '#1a1a1a',
              padding: '18px 56px',
              borderRadius: '50px',
              fontSize: '1.2rem',
              fontWeight: '700',
              border: 'none',
              cursor: 'pointer',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              boxShadow: '0 8px 30px rgba(64, 224, 208, 0.4)',
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 16px 40px rgba(64, 224, 208, 0.6)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(64, 224, 208, 0.4)';
            }}
          >
            🚀 {t.guestTitle}
          </button>
        </div>
      </div>
    </div>
  );
}
