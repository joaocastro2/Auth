import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const AuthService = {
  async sendToken(cnpj: string) {
    const response = await api.post('/auth/request-token', { cnpj });
    return response.status === 200 || response.status === 201;
  },

  async verifyToken(cnpj: string, token: string) {
    const response = await api.post('/auth/login', { cnpj, token });
    return response.status === 200;
  }
};