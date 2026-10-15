import { Router } from "express";
import { SeriesRoutes } from "./modules/series/series.routes";

/**
 * Clase encargada de centralizar todas las rutas de la aplicación.
 *
 * @example
 * ```ts
 * app.use(AppRoutes.routes);
 * ```
 */
export class AppRoutes {

  /**
   * Devuelve el router principal de la aplicación.
   *
   * @returns Router de Express con todas las rutas registradas
   */
  static get routes(): Router {
    const router = Router();

    // Definir rutas
    router.use("/api/series", SeriesRoutes.routes());

    return router;
  }
}
