import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { ManualPage } from './pages/ManualPage';
import { SitemapPage } from './pages/SitemapPage';
import './styles/app.scss';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="manual" element={<ManualPage />} />
      <Route path="sitemap" element={<SitemapPage />} />
    </Routes>
  );
}

export default App;
