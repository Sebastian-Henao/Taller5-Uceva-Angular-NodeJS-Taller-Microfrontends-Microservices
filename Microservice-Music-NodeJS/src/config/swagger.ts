import swaggerJsdoc from 'swagger-jsdoc';
import { envs } from './envs';

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sonora Music API',
      version: '1.0.0',
      description: 'API de canciones ficticias para el microfrontend de música.',
    },
    servers: [{ url: `http://localhost:${envs.port}` }],
  },
  apis: ['./src/presentation/modules/**/*.routes.ts', './src/config/swagger.schemas.ts'],
});
