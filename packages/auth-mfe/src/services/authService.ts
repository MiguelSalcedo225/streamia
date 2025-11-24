import { LoginFormData, RegisterFormData, RecoverPasswordFormData, ResetPasswordFormData } from '../schemas/authSchemas';
import type { ApiResponse, User } from '@streamia/shared/types';
import { createLogger } from '@streamia/shared/utils';

const logger = createLogger('AuthService');
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Log de configuración al iniciar
logger.info('AuthService initialized', { API_URL });

export const authService = {
  async login(data: LoginFormData): Promise<ApiResponse<{ user: User; token: string }>> {
    const url = `${API_URL}/users/login`;
    logger.info('Attempting login', { url, email: data.email });
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      logger.info('Login response received', { 
        status: response.status, 
        statusText: response.statusText,
        ok: response.ok 
      });

      const result = await response.json();

      if (!response.ok) {
        logger.error('Login failed', { status: response.status, error: result });
        throw new Error(result.message || 'Error al iniciar sesión');
      }

      logger.info('Login successful');
      return result;
    } catch (error) {
      logger.error('Login error', { 
        error, 
        message: error instanceof Error ? error.message : 'Unknown error',
        url 
      });
      throw error;
    }
  },

  async register(data: RegisterFormData): Promise<ApiResponse<{ user: User; token: string }>> {
    const url = `${API_URL}/users/register`;
    logger.info('Attempting register', { url, username: data.username, email: data.email });
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
        }),
      });

      logger.info('Register response received', { 
        status: response.status, 
        statusText: response.statusText,
        ok: response.ok 
      });

      const result = await response.json();

      if (!response.ok) {
        logger.error('Register failed', { status: response.status, error: result });
        throw new Error(result.message || 'Error al registrar usuario');
      }

      logger.info('Register successful');
      return result;
    } catch (error) {
      logger.error('Register error', { 
        error, 
        message: error instanceof Error ? error.message : 'Unknown error',
        url 
      });
      throw error;
    }
  },

  async recoverPassword(data: RecoverPasswordFormData): Promise<ApiResponse<void>> {
    const response = await fetch(`${API_URL}/users/recover-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Error al recuperar contraseña');
    }

    return result;
  },

  async resetPassword(token: string, data: ResetPasswordFormData): Promise<ApiResponse<void>> {
    const response = await fetch(`${API_URL}/users/reset-password/${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: data.password,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Error al restablecer contraseña');
    }

    return result;
  },
};
