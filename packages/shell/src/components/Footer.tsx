import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>STREAMIA</h3>
          <p>Tu plataforma de streaming de películas</p>
        </div>

        <div className="footer-section">
          <h4>Enlaces</h4>
          <ul>
            <li><Link to="/about">Acerca de</Link></li>
            <li><Link to="/contact">Contacto</Link></li>
            <li><Link to="/manual">Manual</Link></li>
            <li><Link to="/sitemap">Mapa del sitio</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Legal</h4>
          <ul>
            <li><Link to="/privacy">Privacidad</Link></li>
            <li><Link to="/terms">Términos de uso</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <p className="footer-copy">
            &copy; {currentYear} STREAMIA. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
