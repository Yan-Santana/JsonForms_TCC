import api from '../config/api';

export const login = (token) => {
  localStorage.setItem('token', token);
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const getProfile = async () => {
  try {
    const response = await api.get('/api/auth/profile');
    return response.data;
  } catch (error) {
    console.error('Erro ao obter perfil:', error);
    throw error;
  }
};
