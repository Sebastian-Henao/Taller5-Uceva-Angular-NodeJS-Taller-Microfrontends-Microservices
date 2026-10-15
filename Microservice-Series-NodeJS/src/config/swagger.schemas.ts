/**
 * @openapi
 * components:
 *   schemas:
 *     Serie:
 *       type: object
 *       description: Representa una serie de televisión del catálogo de Netflix
 *       required:
 *         - id
 *         - title
 *         - synopsis
 *         - genre
 *         - releaseYear
 *         - seasons
 *         - episodes
 *         - rating
 *         - cast
 *         - country
 *         - ageRating
 *         - posterUrl
 *         - backdropUrl
 *         - status
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: Stranger Things
 *         synopsis:
 *           type: string
 *           example: Cuando un niño desaparece, sus amigos y una niña con poderes telequinéticos descubren un oscuro misterio.
 *         genre:
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
 *           example: Ciencia ficción
 *         releaseYear:
 *           type: integer
 *           example: 2016
 *         seasons:
 *           type: integer
 *           example: 4
 *         episodes:
 *           type: integer
 *           example: 34
 *         rating:
 *           type: number
 *           format: float
 *           example: 8.7
 *         cast:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Millie Bobby Brown", "Finn Wolfhard", "Winona Ryder"]
 *         country:
 *           type: string
 *           example: Estados Unidos
 *         ageRating:
 *           type: string
 *           enum:
 *             - TV-Y
 *             - TV-Y7
 *             - TV-G
 *             - TV-PG
 *             - TV-14
 *             - TV-MA
 *           example: TV-14
 *         posterUrl:
 *           type: string
 *           format: uri
 *           example: https://picsum.photos/seed/netflix-serie-1/400/600
 *         backdropUrl:
 *           type: string
 *           format: uri
 *           example: https://picsum.photos/seed/netflix-backdrop-1/1280/720
 *         status:
 *           type: string
 *           enum:
 *             - En emisión
 *             - Finalizada
 *           example: En emisión
 *     PaginatedSeriesResponse:
 *       type: object
 *       description: Respuesta paginada con listado de series
 *       required:
 *         - data
 *         - page
 *         - limit
 *         - total
 *         - totalPages
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Serie'
 *         page:
 *           type: integer
 *           example: 1
 *         limit:
 *           type: integer
 *           example: 12
 *         total:
 *           type: integer
 *           example: 60
 *         totalPages:
 *           type: integer
 *           example: 5
 *     ErrorResponse:
 *       type: object
 *       description: Formato estándar de respuesta de error
 *       required:
 *         - statusCode
 *         - error
 *       properties:
 *         statusCode:
 *           type: integer
 *           example: 404
 *         error:
 *           type: string
 *           example: Serie con id 999 no encontrada
 */
export {};
