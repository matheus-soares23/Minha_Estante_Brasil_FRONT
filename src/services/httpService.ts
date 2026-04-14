const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface HttpServiceConfig {
  baseUrl?: string;
  headers?: HeadersInit;
  timeout?: number;
}

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}

export class HttpService {
  private baseUrl: string;
  private defaultHeaders: HeadersInit;
  private timeout: number;

  constructor(config: HttpServiceConfig = {}) {
    this.baseUrl = config.baseUrl || API_URL;
    this.defaultHeaders = config.headers || {};
    this.timeout = config.timeout || 30000;
  }

  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const token = localStorage.getItem('meb_access_token');
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...this.defaultHeaders,
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
    };

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(url, {
        ...config,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const error: ApiError = await response.json().catch(() => ({
          message: 'Erro ao processar resposta do servidor',
          statusCode: response.status,
        }));
        
        if (response.status === 401) {
          localStorage.removeItem('meb_access_token');
          localStorage.removeItem('meb_user');
        }

        throw new Error(error.message || `Erro: ${response.status}`);
      }

      if (response.status === 204) {
        return {} as T;
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Tempo limite de requisição excedido');
        }
        throw error;
      }
      throw new Error('Erro desconhecido ao fazer requisição');
    }
  }

  async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  async post<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }


  async put<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }

  setBaseUrl(url: string): void {
    this.baseUrl = url;
  }

  setDefaultHeaders(headers: HeadersInit): void {
    this.defaultHeaders = { ...this.defaultHeaders, ...headers };
  }

  setTimeout(timeout: number): void {
    this.timeout = timeout;
  }
}

export const httpService = new HttpService();
