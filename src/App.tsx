import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import { LanguageProvider } from './context/LanguageContext';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Faq from './pages/Faq';
import Privacy from './pages/Privacy';
import Internships from './pages/Internships';
import MyCV from './pages/MyCV';
import BuildNetwork from './pages/BuildNetwork';
import JobSimulations from './pages/JobSimulations';
import PersonaiFeature from './pages/PersonaiFeature';
import AuthSelection from './pages/AuthSelection';
import ChatPage from './pages/ChatPage';
import Demo from './pages/Demo';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MyHomePage from './pages/MyHomePage';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<AboutUs />} />
              <Route path="contact" element={<Contact />} />
              <Route path="faq" element={<Faq />} />

              {/* Other routes that can point to a generic placeholder for now */}
              <Route path="network" element={<BuildNetwork />} />
              <Route path="cv" element={<MyCV />} />
              <Route path="simulations" element={<JobSimulations />} />
              <Route path="internships" element={<Internships />} />
              
              {/* Newly added feature routes */}
              <Route path="demo" element={<Demo />} />
              <Route path="privacy-policy" element={<Privacy />} />
              <Route path="personi" element={<PersonaiFeature />} />
              <Route path="auth-selection" element={<AuthSelection />} />
              <Route path="chat" element={<ChatPage />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="myhomepage" element={<MyHomePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
