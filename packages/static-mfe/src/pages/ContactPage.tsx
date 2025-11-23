import React from 'react';
import { BreadcrumbNav } from '../components/BreadcrumbNav';
import { ContactForm } from '../components/ContactForm';
import '../styles/contact.scss';

export const ContactPage: React.FC = () => {
  return (
    <div className="contact-page">
      <BreadcrumbNav items={[{ label: 'Contacto' }]} />
      
      <section className="contact-hero">
        <div className="container">
          <h1>Contáctanos</h1>
          <p className="lead">
            ¿Tienes preguntas? Estamos aquí para ayudarte
          </p>
        </div>
      </section>

      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Información de Contacto</h2>
              
              <div className="info-item">
                <h3>📧 Email</h3>
                <p>
                  <a href="mailto:soporte@streamia.com">soporte@streamia.com</a>
                </p>
              </div>

              <div className="info-item">
                <h3>📞 Teléfono</h3>
                <p>+1 (555) 123-4567</p>
                <p className="info-note">Lunes a Viernes, 9:00 - 18:00</p>
              </div>

              <div className="info-item">
                <h3>💬 Chat en Vivo</h3>
                <p>Disponible 24/7 en nuestra aplicación</p>
              </div>

              <div className="info-item">
                <h3>📍 Oficinas</h3>
                <p>
                  123 Streaming Avenue<br />
                  Los Angeles, CA 90028<br />
                  Estados Unidos
                </p>
              </div>
            </div>

            <div className="contact-form-wrapper">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
