import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';

export const setupSwaggerUI = (app: Express) => {
  // Configuração do Swagger UI
  app.use('/api-docs', swaggerUi.serve);
  app.get(
    '/api-docs',
    swaggerUi.setup(swaggerSpec, {
      explorer: true,
      customCss: '.swagger-ui .topbar { display: none }',
      customSiteTitle: 'JsonForms Analytics API',
      swaggerOptions: {
        persistAuthorization: true,
      },
    }),
  );

  // Rota para o JSON do Swagger
  app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
};
