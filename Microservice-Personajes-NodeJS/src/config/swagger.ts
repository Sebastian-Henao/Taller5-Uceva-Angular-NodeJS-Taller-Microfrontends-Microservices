import swaggerJSDoc from "swagger-jsdoc";

/**
 * Especificacion de Swagger (OpenAPI) para la API
 * 
 * @remarks
 * Este obejto configura Swagger mediante `swagger-jsdoc`, 
 * generando automaticamente la documentacion OpenAPI a partir
 * de comentarios JSDoc presentes en los archivos de rutas.
 * 
 * La especificacion resultante es consumida por Swagger UI
 * para mostrar la documentacion interactica de la API
 */
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