import axios from 'axios';

// Em desenvolvimento local (npm run dev), usa localhost
// No Docker, usa a URL do serviço backend
const baseURL =
  window.location.hostname === 'localhost'
    ? import.meta.env.VITE_API_URL_LOCAL || 'http://localhost:5001'
    : import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Adiciona o token em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
