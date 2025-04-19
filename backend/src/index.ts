import express from 'express';
import dotenv from 'dotenv';
import { AppDataSource } from './config/database';
import { setupSwaggerUI } from './config/swagger-ui';
import { corsMiddleware, corsHeadersMiddleware } from './middlewares/cors';
import { loggingMiddleware } from './middlewares/logging';
import { errorMiddleware } from './middlewares/error';
import authRoutes from './routes/auth';
import formRoutes from './routes/form';

// Carrega as variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(loggingMiddleware);
app.use(corsMiddleware);
app.use(corsHeadersMiddleware);
app.use(express.json());

// Configuração do Swagger
setupSwaggerUI(app);

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/form', formRoutes);

// Rota de teste
app.get('/api/test', (req, res) => {
  res.json({
    message: 'API is working!',
    environment: process.env.NODE_ENV || 'development',
    isDocker: process.env.POSTGRES_HOST === 'postgres',
  });
});

// Middleware de erro global
app.use(errorMiddleware);

const startServer = async () => {
  try {
    await AppDataSource.initialize();
    app.listen(PORT);
  } catch (error) {
    process.exit(1);
  }
};

startServer();
