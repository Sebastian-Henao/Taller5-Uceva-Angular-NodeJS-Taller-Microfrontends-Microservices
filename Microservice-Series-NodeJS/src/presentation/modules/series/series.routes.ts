import { Router } from "express";
import { SeriesController } from "./series.controller";
import { SeriesService } from "./series.service";

/**
 * Rutas del módulo de series.
 */
export class SeriesRoutes {

  /**
   * Devuelve el router con los endpoints de series.
   *
   * @param service Servicio de series (inyectable para pruebas)
   * @returns Router de Express
   */
  static routes(service: SeriesService = new SeriesService()): Router {
    const router = Router();
    const controller = new SeriesController(service);

    router.get("/", controller.getSeries);

    router.get("/genres", controller.getGenres);

    router.get("/:id", controller.getSerieById);

    return router;
  }
}
