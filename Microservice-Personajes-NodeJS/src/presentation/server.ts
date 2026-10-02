import cors from "cors";
import express, { Router } from "express";
import path from "path";
import swaggerUi from 'swagger-ui-express';
import { Options } from "../domain/interfaces/server.interface";
import { swaggerSpec } from "../config/swagger";

export class Server {
    public readonly app = express();

    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor(options: Options) {
        const { port, publicPath, routes } = options;
        this.port = port;
        this.publicPath = publicPath;
        this.routes = routes;
    }

    async start(): Promise<void> {
        this.app.use(cors());
        this.app.use(express.json());

        this.app.use(express.static(this.publicPath));

        this.app.use(this.routes);

        this.app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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