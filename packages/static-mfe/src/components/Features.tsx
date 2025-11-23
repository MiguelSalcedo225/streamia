import React from 'react';
import type { Feature } from '../types/static.types';

const features: Feature[] = [
  {
    id: '1',
    title: 'Catálogo Extenso',
    description: 'Miles de películas y series para disfrutar en cualquier momento',
    icon: '🎬',
  },
  {
    id: '2',
    title: 'Alta Calidad',
    description: 'Contenido en HD y 4K para la mejor experiencia visual',
    icon: '🎥',
  },
  {
    id: '3',
    title: 'Sin Anuncios',
    description: 'Disfruta de tu contenido favorito sin interrupciones',
    icon: '🚫',
  },
  {
    id: '4',
    title: 'Multiplataforma',
    description: 'Accede desde cualquier dispositivo, en cualquier lugar',
    icon: '📱',
  },
];

export const Features: React.FC = () => {
  return (
    <section className="features-section">
      <div className="container">
        <h2>¿Por qué elegir Streamia?</h2>
        <div className="features-grid">
          {features.map((feature) => (
            <div key={feature.id} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
