/**
 * @openapi
 * components:
 *   schemas:
 *     MusicTrack:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - artist
 *         - album
 *         - genre
 *         - releasedYear
 *         - durationSeconds
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: Midnight Echo
 *         artist:
 *           type: string
 *           example: The Satellites
 *         album:
 *           type: string
 *           example: Night Signals
 *         genre:
 *           type: string
 *           example: Indie
 *         releasedYear:
 *           type: integer
 *           example: 2021
 *         durationSeconds:
 *           type: integer
 *           example: 212
 */
export {};
