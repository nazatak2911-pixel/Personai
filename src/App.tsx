import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'; // v1.1.0-final-moderation-sync

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
import Login from './pages/Login';
import Signup from './pages/Signup';
import MyHomePage from './pages/MyHomePage';
import OnboardingSurvey from './pages/OnboardingSurvey';
import Demo from './pages/Demo';
import MyNetwork from './pages/MyNetwork';
import MyCVDashboard from './pages/MyCVDashboard';
import AdminPanel from './pages/AdminPanel';
import MyInternships from './pages/MyInternships';
import MyJobSimulations from './pages/MyJobSimulations';
import { 
  MyAboutUs, 
  MyContact, 
  MyFaq, 
  MyPrivacy, 
  MyDemo 
} from './pages/MyContentContainers';
import { AuthProvider } from './context/AuthContext';
import FeatureGuard from './components/FeatureGuard';

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
              <Route path="network" element={<FeatureGuard><BuildNetwork /></FeatureGuard>} />
              <Route path="cv" element={<FeatureGuard><MyCV /></FeatureGuard>} />
              <Route path="simulations" element={<FeatureGuard><JobSimulations /></FeatureGuard>} />
              <Route path="internships" element={<FeatureGuard><Internships /></FeatureGuard>} />
              
              {/* Public feature routes - require login or guest */}
              <Route path="demo" element={<FeatureGuard><Demo /></FeatureGuard>} />
              <Route path="privacy-policy" element={<Privacy />} />
              <Route path="personi" element={<FeatureGuard><PersonaiFeature /></FeatureGuard>} />
              <Route path="auth-selection" element={<AuthSelection />} />
              <Route path="chat" element={<FeatureGuard><ChatPage /></FeatureGuard>} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="onboarding-survey" element={<OnboardingSurvey />} />
              <Route path="admin" element={<AdminPanel />} />
              
              {/* Authenticated "My" environment routes */}
              <Route path="myhomepage" element={<MyHomePage />} />
              <Route path="mynetwork" element={<MyNetwork />} />
              <Route path="mycv" element={<MyCVDashboard />} />
              <Route path="mysimulations" element={<MyJobSimulations />} />
              <Route path="myinternships" element={<MyInternships />} />
              <Route path="mypersonai" element={<ChatPage />} />
              <Route path="myabout" element={<MyAboutUs />} />
              <Route path="mycontact" element={<MyContact />} />
              <Route path="myfaq" element={<MyFaq />} />
              <Route path="myprivacy-policy" element={<MyPrivacy />} />
              <Route path="mydemo" element={<MyDemo />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
