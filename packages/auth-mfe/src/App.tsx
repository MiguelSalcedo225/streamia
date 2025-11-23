import { useLocation, Link } from 'react-router-dom';
import { LoginForm } from './components/LoginForm/LoginForm';
import { RegisterForm } from './components/RegisterForm/RegisterForm';
import { createLogger } from '@streamia/shared/utils';
import './App.scss';

const logger = createLogger('Auth-MFE');

function App() {
  const location = useLocation();
  
  logger.info('Auth MFE rendered', { path: location.pathname });

  // Render based on the current path
  if (location.pathname === '/login') {
    return <LoginForm />;
  }
  
  if (location.pathname === '/register') {
    return <RegisterForm />;
  }
  
  if (location.pathname === '/recover-password') {
    return (
      <div className="auth-placeholder">
        <div className="auth-logo">
          <h1>STREAMIA</h1>
        </div>
        <h2>Recuperación de contraseña</h2>
        <p>Esta funcionalidad estará disponible próximamente.</p>
        <Link to="/login" className="back-link">Volver al inicio de sesión</Link>
      </div>
    );
  }
  
  if (location.pathname.startsWith('/reset-password')) {
    return (
      <div className="auth-placeholder">
        <div className="auth-logo">
          <h1>STREAMIA</h1>
        </div>
        <h2>Restablecer contraseña</h2>
        <p>Esta funcionalidad estará disponible próximamente.</p>
        <Link to="/login" className="back-link">Volver al inicio de sesión</Link>
      </div>
    );
  }

  // Default fallback
  return <LoginForm />;
}

export default App;
