// Serviço de autenticação
import { getApiBaseUrl } from '../../config/env.config';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user' | 'volunteer';
}

class AuthService {
  private currentUser: User | null = null;
  private apiBaseUrl = getApiBaseUrl();

  /**
   * Fazer login
   */
  async login(email: string, password: string): Promise<User> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Falha ao fazer login');
      }

      const data = await response.json();
      this.currentUser = data.user;
      localStorage.setItem('token', data.token);
      return data.user;
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  }

  /**
   * Fazer logout
   */
  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('token');
  }

  /**
   * Obter usuário atual
   */
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  /**
   * Verificar se está autenticado
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}

export default new AuthService();
