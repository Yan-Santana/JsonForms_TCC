import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Detecta se está rodando no Docker ou localmente
const isDocker = process.env.NODE_ENV === 'production' || process.env.DOCKER_ENV === 'true';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://backend:5001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
