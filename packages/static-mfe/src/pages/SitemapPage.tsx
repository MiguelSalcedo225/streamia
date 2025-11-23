import React from 'react';
import { Link } from 'react-router-dom';
import { BreadcrumbNav } from '../components/BreadcrumbNav';
import type { SitemapItem } from '../types/static.types';
import '../styles/sitemap.scss';

const sitemapData: SitemapItem[] = [
  {
    title: 'Inicio',
    path: '/',
    description: 'Página principal de Streamia',
  },
  {
    title: 'Autenticación',
    path: '/auth',
    children: [
      { title: 'Iniciar Sesión', path: '/login' },
      { title: 'Registrarse', path: '/register' },
      { title: 'Recuperar Contraseña', path: '/recover-password' },
    ],
  },
  {
    title: 'Información',
    path: '/info',
    children: [
      { title: 'Acerca de', path: '/about' },
      { title: 'Contacto', path: '/contact' },
      { title: 'Manual de Usuario', path: '/manual' },
      { title: 'Mapa del Sitio', path: '/sitemap' },
    ],
  },
  {
    title: 'Cuenta',
    path: '/account',
    children: [
      { title: 'Mi Perfil', path: '/profile' },
      { title: 'Configuración', path: '/settings' },
      { title: 'Favoritos', path: '/favorites' },
      { title: 'Calificaciones', path: '/ratings' },
    ],
  },
];

export const SitemapPage: React.FC = () => {
  const renderSitemapItem = (item: SitemapItem, level: number = 0) => (
    <li key={item.path} className={`sitemap-item level-${level}`}>
      <div className="sitemap-item-content">
        <Link to={item.path} className="sitemap-link">
          {item.title}
        </Link>
        {item.description && (
          <p className="sitemap-description">{item.description}</p>
        )}
      </div>
      {item.children && item.children.length > 0 && (
        <ul className="sitemap-children">
          {item.children.map((child) => renderSitemapItem(child, level + 1))}
        </ul>
      )}
    </li>
  );

  return (
    <div className="sitemap-page">
      <BreadcrumbNav items={[{ label: 'Mapa del Sitio' }]} />
      
      <section className="sitemap-hero">
        <div className="container">
          <h1>Mapa del Sitio</h1>
          <p className="lead">
            Navegación completa de todas las secciones de Streamia
          </p>
        </div>
      </section>

      <section className="sitemap-content">
        <div className="container">
          <ul className="sitemap-list">
            {sitemapData.map((item) => renderSitemapItem(item))}
          </ul>
        </div>
      </section>
    </div>
  );
};
