import express from 'express';
import dotenv from 'dotenv';
import { AppDataSource } from './config/database';
import { setupSwaggerUI } from './config/swagger-ui';
import { startServer } from './config/server';
import { corsMiddleware, corsHeadersMiddleware } from './middlewares/cors';
import { loggingMiddleware } from './middlewares/logging';
import { errorMiddleware } from './middlewares/error';
import authRoutes from './routes/auth';

// Carrega as variáveis de ambiente
dotenv.config();

const app = express();

// Middlewares
app.use(loggingMiddleware);
app.use(corsMiddleware);
app.use(corsHeadersMiddleware);
app.use(express.json());

// Configuração do Swagger
setupSwaggerUI(app);

// Rotas da API
app.use('/api/auth', authRoutes);

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

// Inicializa o banco de dados e inicia o servidor
AppDataSource.initialize()
  .then(() => {
    console.log('Database connection established successfully');
    startServer(app);
  })
  .catch((error) => {
    console.error('Error during database initialization:', error);
    process.exit(1);
  });
