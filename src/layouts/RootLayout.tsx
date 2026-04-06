import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import LanguageSwitcher from '../components/LanguageSwitcher';
import ContactInbox from '../components/ContactInbox';

export default function RootLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dashboardSidebarOpen, setDashboardSidebarOpen] = useState(true); // Open by default when logged in
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user, isLoggedIn, logout } = useAuth();
  
  const isDashboard = location.pathname.startsWith('/my');
  const effectiveSidebarOpen = isDashboard ? dashboardSidebarOpen : isSidebarOpen;

  useEffect(() => {
    const checkMobile = () => {
      // Increased to 1024 to catch landscape phones and tablets
      setIsMobile(window.innerWidth <= 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const openSidebar = () => {
    if (!isMobile && !isDashboard) setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    if (!isMobile && !isDashboard) setIsSidebarOpen(false);
  };

  const toggleSidebar = (e: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (isMobile) {
      const newState = !isSidebarOpen;
      setIsSidebarOpen(newState);
      setDashboardSidebarOpen(newState);
    } else {
      const newState = !dashboardSidebarOpen;
      setDashboardSidebarOpen(newState);
      setIsSidebarOpen(newState);
    }
  };

  const closeSidebarOnDocumentClick = () => {
    if (isMobile && (isSidebarOpen || (isDashboard && dashboardSidebarOpen))) {
      setIsSidebarOpen(false);
      setDashboardSidebarOpen(false);
    }
  };

  const handleNavClick = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
      setDashboardSidebarOpen(false);
    }
  };

  return (
    <div onClick={closeSidebarOnDocumentClick}>
      <nav className="top-nav">
        {/* Left: Brand + Language Switcher */}
        <div className="nav-left-group">
          <div
            className="nav-left brand-trigger-box"
            id="brand-trigger"
            onClick={toggleSidebar}
            role="button"
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <span className="brand-name" style={{ position: 'relative' }}>
              PERSONA<span className="turquoise-text">I</span>
              <span className="demo-badge">demo</span>
            </span>
          </div>
          <LanguageSwitcher />
        </div>

        {/* Center/Right: Nav links + Auth buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
          {/* Nav links - only when not logged in */}
          {!isLoggedIn && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginRight: '20px' }}>
              <button
                className="nav-btn"
                onClick={() => navigate('/about')}
                style={{ fontSize: '0.92rem', padding: '8px 14px', opacity: 0.85 }}
              >
                {t.aboutUs}
              </button>
              <button
                className="nav-btn"
                onClick={() => navigate('/contact')}
                style={{ fontSize: '0.92rem', padding: '8px 14px', opacity: 0.85 }}
              >
                {t.contact}
              </button>
              <button
                className="nav-btn signup-btn"
                onClick={() => navigate('/auth-selection')}
                style={{ fontSize: '0.92rem', padding: '9px 22px', background: '#40e0d0', color: '#1a1a1a', borderRadius: '50px', fontWeight: '700' }}
              >
                {t.tryNow} →
              </button>
            </div>
          )}

          <div className="nav-right">
            {isLoggedIn ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ color: '#ffffff', fontWeight: '500', fontSize: '0.9rem' }}>
                  {t.welcomeNormal}, <span style={{ color: '#40e0d0' }}>{user?.name}</span>
                </span>
                <button 
                  className="nav-btn login-btn" 
                  onClick={() => {
                    logout();
                    setDashboardSidebarOpen(false);
                    setIsSidebarOpen(false);
                    navigate('/');
                  }}
                  style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)' }}
                >
                  {t.logout}
                </button>
              </div>
            ) : (
              <>
                {isDashboard && (
                  <button className="nav-btn" onClick={() => navigate('/')} style={{ background: 'transparent', color: '#fff', border: 'none', fontWeight: '500', marginRight: '10px' }}>
                    {t.mainHome}
                  </button>
                )}
                <button className="nav-btn login-btn" onClick={() => navigate('/login')}>{t.logIn}</button>
                <button className="nav-btn signup-btn" onClick={() => navigate('/signup')}>{t.signUp}</button>
              </>
            )}
          </div>
        </div>
      </nav>

      <div className="app-container">
        {/* Invisible trigger area on left side */}
        {!isMobile && !isDashboard && (
          <div
            className="sidebar-trigger-area"
            id="trigger-area"
            onMouseEnter={openSidebar}
          />
        )}

        <aside
          className={`sidebar ${effectiveSidebarOpen ? 'open' : ''} ${isDashboard && dashboardSidebarOpen ? 'permanent' : ''}`}
          id="sidebar"
          onMouseLeave={closeSidebar}
          onClick={(e) => e.stopPropagation()}
        >
          <ul className="sidebar-menu">
            <li>
              <Link 
                to={isLoggedIn ? "/myhomepage" : "/"} 
                onClick={handleNavClick}
              >
                {t.homePage}
              </Link>
            </li>
            <li>
              <Link to="/mypersonai" onClick={handleNavClick}>
                <span className="white-text">PERSONA</span><span className="turquoise-text">I</span>
              </Link>
            </li>
            <li><Link to="/mynetwork" onClick={handleNavClick}>{t.buildNetwork}</Link></li>
            <li><Link to="/mycv" onClick={handleNavClick}>{t.myCV}</Link></li>
            <li><Link to="/mysimulations" onClick={handleNavClick}>{t.jobSimulations}</Link></li>
            <li><Link to="/myinternships" onClick={handleNavClick}>{t.internshipOpportunities}</Link></li>
            <li><Link to="/myabout" onClick={handleNavClick}>{t.aboutUs}</Link></li>
            <li><Link to="/mycontact" onClick={handleNavClick}>{t.contact}</Link></li>
            <li><Link to="/myfaq" onClick={handleNavClick}>{t.howToUse}</Link></li>
            <li><Link to="/mydemo" onClick={handleNavClick}>{t.demo}</Link></li>
            <li><Link to="/myprivacy-policy" onClick={handleNavClick}>{t.privacyPolicy}</Link></li>
          </ul>
        </aside>

        <main
          className={`main-content ${effectiveSidebarOpen ? 'shifted' : ''}`}
          id="main-content"
          onMouseEnter={closeSidebar}
        >
          <Outlet />
        </main>
      </div>

      {/* Floating Global Components */}
      <ContactInbox />
    </div>
  );
}
