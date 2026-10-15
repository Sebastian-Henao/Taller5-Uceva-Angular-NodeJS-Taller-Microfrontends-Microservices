import swaggerJsdoc from 'swagger-jsdoc';

/**
 * Especificación de Swagger (OpenAPI 3.0) para la API de Series.
 *
 * @remarks
 * Genera la documentación interactiva a partir de las anotaciones
 * JSDoc de las rutas y los esquemas definidos en `swagger.schemas.ts`.
 */
export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Microservicio de Series - Netflix',
      version: '1.0.0',
      description:
        'Documentación de la API REST del microservicio de Series de Netflix con datos simulados vía Faker.js.',
      contact: {
        name: 'Taller Arquitectura de Software - UCEVA',
      },
    },
    servers: [
      {
        url: 'http://localhost:3005',
        description: 'Servidor local de desarrollo',
      },
    ],
  },
  apis: [
    './src/presentation/modules/**/*.routes.ts',
    './src/config/swagger.schemas.ts',
    './dist/presentation/modules/**/*.routes.js',
    './dist/config/swagger.schemas.js',
  ],
});
