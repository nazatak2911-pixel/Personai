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
import Demo from './pages/Demo';

function App() {
  return (
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
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
