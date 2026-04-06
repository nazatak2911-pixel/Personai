import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import LanguageSwitcher from '../components/LanguageSwitcher';

export default function RootLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user, isLoggedIn, logout } = useAuth();
  
  const isDashboard = location.pathname.startsWith('/my');
  const effectiveSidebarOpen = isDashboard ? true : isSidebarOpen;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
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
    if (isMobile) {
      e.preventDefault();
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  const closeSidebarOnDocumentClick = () => {
    if (isMobile && isSidebarOpen && !isDashboard) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div onClick={closeSidebarOnDocumentClick}>
      <nav className="top-nav">
        {/* Left: Brand + Language Switcher */}
        <div className="nav-left-group">
          <Link
            to="/"
            style={{ textDecoration: 'none' }}
            className="nav-left"
            id="brand-trigger"
            onClick={toggleSidebar}
          >
            <span className="brand-name" style={{ position: 'relative' }}>
              PERSONA<span className="turquoise-text">I</span>
              <span className="demo-badge">demo</span>
            </span>
          </Link>
          <LanguageSwitcher />
        </div>

        {/* Right: Auth buttons / User Profile */}
        <div className="nav-right">
          {isLoggedIn ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span style={{ color: '#ffffff', fontWeight: '500', fontSize: '0.9rem' }}>
                Welcome, <span style={{ color: '#40e0d0' }}>{user?.name}</span>
              </span>
              <button 
                className="nav-btn login-btn" 
                onClick={logout}
                style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)' }}
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <button className="nav-btn login-btn" onClick={() => navigate('/login')}>{t.logIn}</button>
              <button className="nav-btn signup-btn" onClick={() => navigate('/signup')}>{t.signUp}</button>
            </>
          )}
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
          className={`sidebar ${effectiveSidebarOpen ? 'open' : ''} ${isDashboard ? 'permanent' : ''}`}
          id="sidebar"
          onMouseLeave={closeSidebar}
          onClick={(e) => e.stopPropagation()}
        >
          <ul className="sidebar-menu">
            <li>
              <Link 
                to={isLoggedIn ? "/myhomepage" : "/"} 
                onClick={() => isMobile && setIsSidebarOpen(false)}
              >
                {t.homePage}
              </Link>
            </li>
            <li>
              <Link to="/mypersonai" onClick={() => isMobile && setIsSidebarOpen(false)}>
                <span className="white-text">PERSONA</span><span className="turquoise-text">I</span>
              </Link>
            </li>
            <li><Link to="/mynetwork" onClick={() => isMobile && setIsSidebarOpen(false)}>{t.buildNetwork}</Link></li>
            <li><Link to="/mycv" onClick={() => isMobile && setIsSidebarOpen(false)}>{t.myCV}</Link></li>
            <li><Link to="/mysimulations" onClick={() => isMobile && setIsSidebarOpen(false)}>{t.jobSimulations}</Link></li>
            <li><Link to="/myinternships" onClick={() => isMobile && setIsSidebarOpen(false)}>{t.internshipOpportunities}</Link></li>
            <li><Link to="/myabout" onClick={() => isMobile && setIsSidebarOpen(false)}>{t.aboutUs}</Link></li>
            <li><Link to="/mycontact" onClick={() => isMobile && setIsSidebarOpen(false)}>{t.contact}</Link></li>
            <li><Link to="/myfaq" onClick={() => isMobile && setIsSidebarOpen(false)}>{t.howToUse}</Link></li>
            <li><Link to="/mydemo" onClick={() => isMobile && setIsSidebarOpen(false)}>{t.demo}</Link></li>
            <li><Link to="/myprivacy-policy" onClick={() => isMobile && setIsSidebarOpen(false)}>{t.privacyPolicy}</Link></li>
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
    </div>
  );
}
