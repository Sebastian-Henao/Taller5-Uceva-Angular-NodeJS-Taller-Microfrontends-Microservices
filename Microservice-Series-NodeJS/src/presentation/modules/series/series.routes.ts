import { Router } from "express";
import { SeriesController } from "./series.controller";
import { SeriesService } from "./series.service";

/**
 * Rutas del módulo de series.
 */
export class SeriesRoutes {

  /**
   * Devuelve el router con los endpoints de series documentados con OpenAPI.
   *
   * @param service Servicio de series (inyectable para pruebas)
   * @returns Router de Express
   */
  static routes(service: SeriesService = new SeriesService()): Router {
    const router = Router();
    const controller = new SeriesController(service);

    /**
     * @openapi
     * /api/series:
     *   get:
     *     summary: Listar series con paginación y filtros
     *     description: Retorna una lista paginada de series de Netflix con filtros opcionales por género y búsqueda de texto.
     *     tags:
     *       - Series
     *     parameters:
     *       - in: query
     *         name: page
     *         required: false
     *         schema:
     *           type: integer
     *           default: 1
     *           minimum: 1
     *         description: Número de página a consultar
     *       - in: query
     *         name: limit
     *         required: false
     *         schema:
     *           type: integer
     *           default: 12
     *           minimum: 1
     *           maximum: 50
     *         description: Cantidad de series por página
     *       - in: query
     *         name: genre
     *         required: false
     *         schema:
     *           type: string
     *           enum:
     *             - Drama
     *             - Comedia
     *             - Ciencia ficción
     *             - Thriller
     *             - Crimen
     *             - Fantasía
     *             - Terror
     *             - Romance
     *             - Documental
     *             - Animación
     *         description: Género de la serie
     *       - in: query
     *         name: search
     *         required: false
     *         schema:
     *           type: string
     *         description: Término de búsqueda por título
     *     responses:
     *       200:
     *         description: Lista paginada de series obtenida con éxito
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/PaginatedSeriesResponse'
     *       400:
     *         description: Parámetros de consulta inválidos
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ErrorResponse'
     *       500:
     *         description: Error interno del servidor
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ErrorResponse'
     */
    router.get("/", controller.getSeries);

    /**
     * @openapi
     * /api/series/genres:
     *   get:
     *     summary: Obtener géneros disponibles
     *     description: Retorna la lista de géneros disponibles en el catálogo de series.
     *     tags:
     *       - Series
     *     responses:
     *       200:
     *         description: Lista de géneros disponibles
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: string
     *               example: ["Drama", "Comedia", "Ciencia ficción", "Thriller"]
     *       500:
     *         description: Error interno del servidor
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ErrorResponse'
     */
    router.get("/genres", controller.getGenres);

    /**
     * @openapi
     * /api/series/{id}:
     *   get:
     *     summary: Obtener detalle de una serie por ID
     *     description: Retorna la información completa de una serie a partir de su identificador único.
     *     tags:
     *       - Series
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *           minimum: 1
     *         description: Identificador numérico de la serie
     *     responses:
     *       200:
     *         description: Serie encontrada exitosamente
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Serie'
     *       400:
     *         description: Identificador inválido
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ErrorResponse'
     *       404:
     *         description: Serie no encontrada
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ErrorResponse'
     *       500:
     *         description: Error interno del servidor
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ErrorResponse'
     */
    router.get("/:id", controller.getSerieById);

    return router;
  }
}
