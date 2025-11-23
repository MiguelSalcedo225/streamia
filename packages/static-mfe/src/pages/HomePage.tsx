import React from 'react';
import { Link } from 'react-router-dom';
import { Features } from '../components/Features';
import '../styles/home.scss';

export const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Bienvenido a Streamia</h1>
          <p className="hero-subtitle">
            Tu plataforma de streaming favorita con miles de películas y series
          </p>
          <div className="hero-actions">
            <Link to="/register" className="btn btn-primary">
              Comenzar ahora
            </Link>
            <Link to="/about" className="btn btn-secondary">
              Más información
            </Link>
          </div>
        </div>
      </section>

      <Features />

      <section className="cta-section">
        <div className="container">
          <h2>¿Listo para comenzar?</h2>
          <p>Únete a miles de usuarios que ya disfrutan de Streamia</p>
          <Link to="/register" className="btn btn-primary btn-lg">
            Crear cuenta gratis
          </Link>
        </div>
      </section>
    </div>
  );
};
