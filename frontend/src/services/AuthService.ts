import axios from 'axios';

// Java backend URL
const api = axios.create({
  baseURL: 'http://localhost:8080',
});

export const AuthService = {
  async sendToken(cnpj: string) {
    // cnpj
    return api.post('/auth/request-token', { cnpj });
  },

  async verifyToken(cnpj: string, token: string) {
    return api.post('/auth/login', { cnpj, token });
  }
};