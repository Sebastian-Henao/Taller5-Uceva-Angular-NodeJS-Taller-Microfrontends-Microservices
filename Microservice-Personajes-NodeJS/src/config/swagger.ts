import swaggerJSDoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJSDoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Client Server NodeJS',
            version: '1.0.0',
            description: 'Documentacion de la API con Swagger',
        },
        servers: [
            {
                url: 'http://localhost:3003',
            },
        ],
    },
    apis: [
        './src/presentation/modules/**/*.routes.ts',
        './src/config/swagger.schemas.ts',
    ],
});