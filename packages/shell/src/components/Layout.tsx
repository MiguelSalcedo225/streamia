import React from 'react';
import { NavBar } from './NavBar';
import { Footer } from './Footer';
import './Layout.scss';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <NavBar />
      <main className="layout-main">
        {children}
      </main>
      <Footer />
    </div>
  );
};
