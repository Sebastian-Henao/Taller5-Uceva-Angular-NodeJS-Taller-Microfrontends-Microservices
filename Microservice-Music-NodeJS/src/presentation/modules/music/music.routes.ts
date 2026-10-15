import { Router } from 'express';
import { MusicController } from './music.controller';

export class MusicRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new MusicController();

    /**
     * @openapi
     * /api/music/tracks/{count}:
     *   get:
     *     summary: Obtener canciones ficticias
     *     description: Genera canciones de muestra con Faker.js.
     *     tags:
     *       - Music
     *     parameters:
     *       - in: path
     *         name: count
     *         required: true
     *         description: Cantidad de canciones (entre 1 y 50).
     *         schema:
     *           type: integer
     *           minimum: 1
     *           maximum: 50
     *           example: 12
     *     responses:
     *       200:
     *         description: Lista de canciones generada.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/MusicTrack'
     *       400:
     *         description: La cantidad solicitada no es válida.
     */
    router.get('/tracks/:count', controller.getTracks);
    return router;
  }
}
