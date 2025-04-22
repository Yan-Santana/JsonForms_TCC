import swaggerJsdoc from 'swagger-jsdoc';
import dotenv from 'dotenv';

dotenv.config();

const DEFAULT_PORT = process.env.PORT || 5000;

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API JsonForms Analytics',
      version: '1.0.0',
      description: 'API para gerenciamento de formulários e análise de dados',
    },
    components: {
      schemas: {
        User: {
          type: 'object',
          required: ['firstName', 'lastName', 'email', 'password', 'group'],
          properties: {
            id: {
              type: 'number',
              format: 'id',
              description: 'ID único do usuário',
            },
            firstName: {
              type: 'string',
              description: 'Primeiro nome do usuário',
            },
            lastName: {
              type: 'string',
              description: 'Sobrenome do usuário',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email do usuário',
            },
            password: {
              type: 'string',
              format: 'password',
              description: 'Senha do usuário',
            },
            group: {
              type: 'string',
              enum: ['Grupo A', 'Grupo B'],
              description: 'Grupo ao qual o usuário pertence',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Mensagem de erro',
            },
          },
        },
        LoginResponse: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
              description: 'JWT token para autenticação',
            },
          },
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Entre com seu JWT token',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: [
      {
        name: 'Autenticação',
        description: 'Endpoints relacionados à autenticação de usuários',
      },
      {
        name: 'Formulários',
        description: 'Endpoints relacionados ao gerenciamento de formulários',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
