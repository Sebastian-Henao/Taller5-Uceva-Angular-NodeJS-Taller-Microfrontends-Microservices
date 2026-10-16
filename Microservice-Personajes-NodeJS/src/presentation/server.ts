import express, { Router } from "express";
import { Options } from "swagger-jsdoc";
import { swaggerSpec } from "../config/swagger";
import cors from "cors";
import path from "path";
import swaggerUi from "swagger-ui-express";

/**
 * Clase que representa el servidor Express de la aplicacion
 * 
 * @remarks
 * Esta clase centraliza la configuracion del servidor HTTP,
 * incluyendo middlewares, rutas, documentacion Swagger y SPA
 * 
 * Se encarga de levantar la aplicacion y exponer todos los endpoints
 */
export class Server {
    /** Instancia de Express */
    public readonly app = express();

    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;

    /**
     * Crea una nueva instancia del servidor
     * 
     * @param options Configuracion del servidor
     */
    constructor(options: Options) {
        const { port, publicPath, routes } = options;
        this.port = port;
        this.publicPath = publicPath;
        this.routes = routes;
    }

    /**
     * Inicializar y arranca el servidor
     * 
     * @remarks
     * - Configura middlewares de CORS y JSON
     * - Configura carpeta pública
     * - Registra las rutas de la aplicación
     * - Configura Swagger UI en `/api/docs`
     * - Sirve SPA para rutas no encontradas
     * - Escucha el puerto configurado
     */
    async start(): Promise<void> {
        //* Middlewares
        this.app.use(cors());
        this.app.use(express.json());

        //* Public Folder
        this.app.use(express.static(this.publicPath));

        //* Routes
        this.app.use(this.routes);

        //* Swagger Docs
        this.app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

        //* SPA
        this.app.use((req, res) => {
            res.sendFile(
                path.join(__dirname, `../../${this.publicPath}/index.html`)
            );
        });

        this.app.listen(this.port, () => {
            console.log(`Microservicio Personajes esta corriendo en el puerto ${this.port}`);
        });
    }
}