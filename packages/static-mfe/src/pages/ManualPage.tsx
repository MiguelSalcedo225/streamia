import React from 'react';
import { BreadcrumbNav } from '../components/BreadcrumbNav';
import type { ManualSection } from '../types/static.types';
import '../styles/manual.scss';

const manualSections: ManualSection[] = [
  {
    id: '1',
    title: 'Primeros Pasos',
    content: 'Aprende cómo comenzar a usar Streamia en pocos minutos.',
    subsections: [
      {
        id: '1.1',
        title: 'Crear una cuenta',
        content: 'Visita la página de registro y completa el formulario con tus datos.',
      },
      {
        id: '1.2',
        title: 'Configurar tu perfil',
        content: 'Personaliza tu experiencia añadiendo tus preferencias.',
      },
    ],
  },
  {
    id: '2',
    title: 'Navegación',
    content: 'Descubre cómo explorar nuestro catálogo de contenido.',
    subsections: [
      {
        id: '2.1',
        title: 'Buscar contenido',
        content: 'Usa la barra de búsqueda para encontrar películas y series.',
      },
      {
        id: '2.2',
        title: 'Filtros y categorías',
        content: 'Filtra el contenido por género, año, calificación y más.',
      },
    ],
  },
  {
    id: '3',
    title: 'Reproducción',
    content: 'Todo lo que necesitas saber sobre reproducir contenido.',
    subsections: [
      {
        id: '3.1',
        title: 'Controles de reproducción',
        content: 'Pausa, adelanta, retrocede y ajusta la calidad del video.',
      },
      {
        id: '3.2',
        title: 'Subtítulos y audio',
        content: 'Configura subtítulos y pistas de audio alternativas.',
      },
    ],
  },
];

export const ManualPage: React.FC = () => {
  return (
    <div className="manual-page">
      <BreadcrumbNav items={[{ label: 'Manual de Usuario' }]} />
      
      <section className="manual-hero">
        <div className="container">
          <h1>Manual de Usuario</h1>
          <p className="lead">
            Guía completa para aprovechar al máximo Streamia
          </p>
        </div>
      </section>

      <section className="manual-content">
        <div className="container">
          <div className="manual-grid">
            <aside className="manual-sidebar">
              <h3>Contenidos</h3>
              <nav className="manual-nav">
                <ul>
                  {manualSections.map((section) => (
                    <li key={section.id}>
                      <a href={`#section-${section.id}`}>{section.title}</a>
                      {section.subsections && (
                        <ul>
                          {section.subsections.map((subsection) => (
                            <li key={subsection.id}>
                              <a href={`#section-${subsection.id}`}>
                                {subsection.title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            <div className="manual-main">
              {manualSections.map((section) => (
                <div key={section.id} className="manual-section">
                  <h2 id={`section-${section.id}`}>{section.title}</h2>
                  <p>{section.content}</p>
                  
                  {section.subsections && (
                    <div className="manual-subsections">
                      {section.subsections.map((subsection) => (
                        <div key={subsection.id} className="manual-subsection">
                          <h3 id={`section-${subsection.id}`}>
                            {subsection.title}
                          </h3>
                          <p>{subsection.content}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
