import { httpService } from './httpService';
import { LoginDto, RegisterDto, AuthResponse, User } from '../types/auth';

class AuthService {
  private readonly basePath = '/auth';
  private readonly TOKEN_KEY = 'meb_access_token';
  private readonly USER_KEY = 'meb_user';

  async login(data: LoginDto): Promise<AuthResponse> {
    const response = await httpService.post<AuthResponse>(`${this.basePath}/login`, data);
    this.setToken(response.accessToken);
    this.setUser(response.user);
    return response;
  }

  async register(data: RegisterDto): Promise<AuthResponse> {
    const response = await httpService.post<AuthResponse>(`${this.basePath}/register`, data);
    this.setToken(response.accessToken);
    this.setUser(response.user);
    return response;
  }

  logout(): void {
    this.removeToken();
    this.removeUser();
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  getUser(): User | null {
    const userJson = localStorage.getItem(this.USER_KEY);
    if (!userJson) return null;
    try {
      return JSON.parse(userJson);
    } catch {
      return null;
    }
  }

  setUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  removeUser(): void {
    localStorage.removeItem(this.USER_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch {
      return null;
    }
  }

  isTokenExpired(token: string): boolean {
    const decoded = this.decodeToken(token);
    if (!decoded || !decoded.exp) return true;
    return Date.now() >= decoded.exp * 1000;
  }
}

export const authService = new AuthService();
