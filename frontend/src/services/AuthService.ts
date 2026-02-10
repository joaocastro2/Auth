import axios, { AxiosError } from 'axios';

// Interfaces centralizadas
export interface AuthResponse {
  message?: string;
  token?: string;
}

export interface AuthError {
  message: string;
  error?: string; // Algumas exceções do Spring usam a chave 'error' por padrão
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Função utilitária para limpar caracteres não numéricos do CNPJ
 */
const cleanCNPJ = (cnpj: string) => cnpj.replace(/\D/g, '');

export const AuthService = {
  async sendToken(cnpj: string): Promise<void> {
    try {
      await api.post('/auth/request-token', { cnpj: cleanCNPJ(cnpj) });
    } catch (error) {
      // Usamos uma função estática ou arrow function para evitar problemas de 'this'
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
 * Tratamento de erros isolado para manter o objeto AuthService limpo.
 * Tenta buscar 'message' ou 'error' do corpo da resposta do Spring Boot.
 */
function handleRequestError(error: AxiosError<AuthError>): never {
  if (error.response) {
    // Tenta capturar a mensagem vinda do GlobalExceptionHandler do Java
    const message = error.response.data?.message || error.response.data?.error;
    throw new Error(message || `Erro ${error.response.status}: Falha na operação`);
  } 
  
  if (error.request) {
    throw new Error('Não foi possível comunicar com o servidor. Verifique sua conexão.');
  }

  throw new Error('Erro inesperado ao processar a requisição.');
}