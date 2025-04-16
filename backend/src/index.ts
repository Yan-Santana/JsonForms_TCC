import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { AppDataSource } from './config/database';
import authRoutes from './routes/auth';
import path from 'path';
import net from 'net';

// Carrega as variáveis de ambiente
dotenv.config();

// Configurações do ambiente
const DEFAULT_PORT = 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';
const isDocker = process.env.POSTGRES_HOST === 'postgres';

const app = express();

// Middleware para logging
app.use((req, res, next) => {
  console.log(`[${NODE_ENV}] ${req.method} ${req.path}`);
  next();
});

// Configuração do CORS
app.use(
  cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  }),
);

// Middleware para processar JSON
app.use(express.json());

// Configuração do Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API documentation for the application',
    },
    servers: [
      {
        url: `http://localhost:${DEFAULT_PORT}`,
        description: `${NODE_ENV} server`,
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Caminho para os arquivos de rota
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Rota para a documentação do Swagger
app.use('/api-docs', swaggerUi.serve);
app.get(
  '/api-docs',
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'API Documentation',
  }),
);

// Rota para o JSON do Swagger
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Rotas da API
app.use('/api/auth', authRoutes);

// Rota de teste
app.get('/api/test', (req, res) => {
  res.json({
    message: 'API is working!',
    environment: NODE_ENV,
    isDocker,
  });
});

// Middleware de erro global
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo deu errado!' });
});

// Função para verificar se uma porta está disponível
const checkPort = (port: number): Promise<boolean> => {
  return new Promise((resolve) => {
    const server = net
      .createServer()
      .once('error', () => {
        resolve(false);
      })
      .once('listening', () => {
        server.close();
        resolve(true);
      })
      .listen(port);
  });
};

// Função para encontrar uma porta disponível
const findAvailablePort = async (startPort: number): Promise<number> => {
  let port = startPort;
  while (!(await checkPort(port))) {
    port++;
  }
  return port;
};

// Função para iniciar o servidor
const startServer = async () => {
  try {
    const requestedPort = Number(process.env.PORT) || DEFAULT_PORT;
    const port = await findAvailablePort(requestedPort);

    app.listen(port, '0.0.0.0', () => {
      console.log(`Server is running in ${NODE_ENV} mode on port ${port}`);
      console.log(`Running in ${isDocker ? 'Docker' : 'Local'} environment`);
      console.log(`Database host: ${process.env.POSTGRES_HOST}`);
      console.log(`Swagger documentation available at http://localhost:${port}/api-docs`);
      console.log(`Swagger JSON available at http://localhost:${port}/swagger.json`);

      if (port !== requestedPort) {
        console.log(`Note: Port ${requestedPort} was in use, using port ${port} instead`);
      }
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

// Inicializa o banco de dados e inicia o servidor
AppDataSource.initialize()
  .then(() => {
    console.log('Database connection established successfully');
    startServer();
  })
  .catch((error) => {
    console.error('Error during database initialization:', error);
    process.exit(1);
  });
