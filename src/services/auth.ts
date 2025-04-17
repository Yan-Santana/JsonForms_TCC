import api from '../config/api';

export const TOKEN_KEY = '@jsonforms:token';

export interface AuthResponse {
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export const isAuthenticated = (): boolean => localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = (): string | null => localStorage.getItem(TOKEN_KEY);

export const login = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const logout = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  delete api.defaults.headers.common['Authorization'];
};

// Configura o token inicial se existir
const token = getToken();
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
