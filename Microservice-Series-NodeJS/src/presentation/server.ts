import cors from "cors";
import express, { Express, Router } from "express";
import { Server as HttpServer } from "http";
import path from "path";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../config/swagger";
import { CustomError } from "../domain/erros/custom.error";
import { HandleError } from "../domain/erros/handle.error";
import { Options } from "../domain/interfaces/server.interface";

/**
 * Clase que representa el servidor Express del microservicio de series.
 *
 * @remarks
 * Centraliza middlewares (CORS, JSON), rutas, documentación Swagger en `/api/docs`,
 * carpeta pública, 404 para rutas de API inexistentes y manejo centralizado de errores.
 */
export class Server {
  /** Instancia de Express */
  public readonly app: Express = express();

  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;
  private readonly corsOrigins: string[];

  /**
   * Crea una nueva instancia del servidor.
   *
   * @param options Configuración del servidor
   */
  constructor(options: Options) {
    const { port, publicPath, routes, corsOrigins } = options;
    this.port = port;
    this.publicPath = publicPath;
    this.routes = routes;
    this.corsOrigins = corsOrigins;
  }

  /**
   * Configura middlewares y rutas sin levantar el puerto.
   *
   * @returns La aplicación Express configurada
   */
  configure(): Express {
    //* Middlewares
    this.app.use(cors({ origin: this.corsOrigins }));
    this.app.use(express.json());

    //* Swagger UI (/api/docs y alias /api-docs)
    this.app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    this.app.get("/api-docs", (_req, res) => res.redirect("/api/docs"));

    //* Public Folder
    this.app.use(express.static(this.publicPath));

    //* Routes
    this.app.use(this.routes);

    //* 404 para endpoints de API inexistentes
    this.app.use("/api", (req, res) => {
      HandleError.error(CustomError.notFound(`Ruta ${req.originalUrl} no encontrada`), res);
    });

    //* SPA
    this.app.use((_req, res) => {
      res.sendFile(path.resolve(this.publicPath, "index.html"));
    });

    //* Manejo centralizado de errores
    this.app.use(HandleError.middleware);

    return this.app;
  }

  /**
   * Configura la aplicación y escucha el puerto configurado.
   *
   * @returns Servidor HTTP en ejecución
   */
  start(callback?: () => void): HttpServer {
    this.configure();
    return this.app.listen(this.port, () => {
      console.log(`Microservice Series Running on Port ${this.port}`);
      callback?.();
    });
  }
}
