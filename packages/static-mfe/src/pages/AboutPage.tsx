import React from 'react';
import { BreadcrumbNav } from '../components/BreadcrumbNav';
import '../styles/about.scss';

export const AboutPage: React.FC = () => {
  return (
    <div className="about-page">
      <BreadcrumbNav items={[{ label: 'Acerca de' }]} />
      
      <section className="about-hero">
        <div className="container">
          <h1>Acerca de Streamia</h1>
          <p className="lead">
            La plataforma de streaming que revoluciona la forma de disfrutar contenido
          </p>
        </div>
      </section>

      <section className="about-content">
        <div className="container">
          <div className="about-section">
            <h2>Nuestra Misión</h2>
            <p>
              En Streamia, nuestra misión es proporcionar acceso ilimitado a contenido de
              entretenimiento de calidad, ofreciendo una experiencia de usuario excepcional
              y accesible para todos.
            </p>
          </div>

          <div className="about-section">
            <h2>Nuestra Historia</h2>
            <p>
              Fundada en 2025, Streamia nació con la visión de crear una plataforma de
              streaming que ponga al usuario en el centro de la experiencia. Desde entonces,
              hemos crecido hasta convertirnos en una de las plataformas más populares.
            </p>
          </div>

          <div className="about-section">
            <h2>Nuestros Valores</h2>
            <ul className="values-list">
              <li>
                <strong>Calidad:</strong> Contenido de la más alta calidad en imagen y sonido
              </li>
              <li>
                <strong>Accesibilidad:</strong> Disponible en todos los dispositivos
              </li>
              <li>
                <strong>Innovación:</strong> Siempre mejorando la experiencia del usuario
              </li>
              <li>
                <strong>Transparencia:</strong> Sin costos ocultos ni sorpresas
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};
