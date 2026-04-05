import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';

export default function RootLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const isLanding = location.pathname === '/';
  const { t } = useLanguage();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const openSidebar = () => {
    if (!isMobile) setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    if (!isMobile) setIsSidebarOpen(false);
  };

  const toggleSidebar = (e: React.MouseEvent) => {
    if (isMobile) {
      e.preventDefault();
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  const closeSidebarOnDocumentClick = () => {
    if (isMobile && isSidebarOpen) {
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

        {/* Right: Auth buttons */}
        <div className="nav-right">
          <button className="nav-btn login-btn">{t.logIn}</button>
          <button className="nav-btn signup-btn">{t.signUp}</button>
        </div>
      </nav>

      <div className="app-container">
        {/* Invisible trigger area on left side */}
        {!isMobile && (
          <div
            className="sidebar-trigger-area"
            id="trigger-area"
            onMouseEnter={openSidebar}
          />
        )}

        <aside
          className={`sidebar ${isSidebarOpen ? 'open' : ''}`}
          id="sidebar"
          onMouseLeave={closeSidebar}
          onClick={(e) => e.stopPropagation()}
        >
          <ul className="sidebar-menu">
            {!isLanding && (
              <li><Link to="/" onClick={() => isMobile && setIsSidebarOpen(false)}>{t.homePage}</Link></li>
            )}
            <li><Link to="/network" onClick={() => isMobile && setIsSidebarOpen(false)}>{t.buildNetwork}</Link></li>
            <li><Link to="/cv" onClick={() => isMobile && setIsSidebarOpen(false)}>{t.myCV}</Link></li>
            <li><Link to="/simulations" onClick={() => isMobile && setIsSidebarOpen(false)}>{t.jobSimulations}</Link></li>
            <li><Link to="/internships" onClick={() => isMobile && setIsSidebarOpen(false)}>{t.internshipOpportunities}</Link></li>
            <li><Link to="/about" onClick={() => isMobile && setIsSidebarOpen(false)}>{t.aboutUs}</Link></li>
            <li><Link to="/contact" onClick={() => isMobile && setIsSidebarOpen(false)}>{t.contact}</Link></li>
            <li><Link to="/faq" onClick={() => isMobile && setIsSidebarOpen(false)}>{t.howToUse}</Link></li>
            <li><Link to="/demo" onClick={() => isMobile && setIsSidebarOpen(false)}>{t.demo}</Link></li>
            <li><Link to="/privacy-policy" onClick={() => isMobile && setIsSidebarOpen(false)}>{t.privacyPolicy}</Link></li>
            <li>
              <Link to="/personi" onClick={() => isMobile && setIsSidebarOpen(false)}>
                <span className="white-text">PERSONA</span><span className="turquoise-text">I</span>
              </Link>
            </li>
          </ul>
        </aside>

        <main
          className={`main-content ${isSidebarOpen ? 'shifted' : ''}`}
          id="main-content"
          onMouseEnter={closeSidebar}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
