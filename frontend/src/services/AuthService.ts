import axios, { AxiosError } from 'axios';

// Centralized interfaces
export interface AuthResponse {
  message?: string;
  token?: string;
}

export interface AuthError {
  message: string;
  error?: string; // Some Spring exceptions use the 'error' key by default.
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Utility function to remove non-numeric characters from the CNPJ (Brazilian company tax ID).
 */
const cleanCNPJ = (cnpj: string) => cnpj.replace(/\D/g, '');

export const AuthService = {
  async sendToken(cnpj: string): Promise<void> {
    try {
      await api.post('/auth/request-token', { cnpj: cleanCNPJ(cnpj) });
    } catch (error) {
      // We use a static function or arrow function to avoid 'this' problems.
      handleRequestError(error as AxiosError<AuthError>);
    }
  },

  async verifyToken(cnpj: string, token: string): Promise<AuthResponse> {
    try {
      const { data } = await api.post<AuthResponse>('/auth/login', { 
        cnpj: cleanCNPJ(cnpj), 
        token 
      });
      return data;
    } catch (error) {
      handleRequestError(error as AxiosError<AuthError>);
    }
  },
};

/**
 * Isolated error handling to keep the AuthService object clean.
 * Try searching for 'message' or 'error' in the Spring Boot response body.
 */
function handleRequestError(error: AxiosError<AuthError>): never {
  if (error.response) {
    // Attempts to capture the message coming from the Java GlobalExceptionHandler.
    const message = error.response.data?.message || error.response.data?.error;
    throw new Error(message || `Erro ${error.response.status}: Falha na operação`);
  } 
  
  if (error.request) {
    throw new Error('Não foi possível comunicar com o servidor. Verifique sua conexão.');
  }

  throw new Error('Erro inesperado ao processar a requisição.');
}