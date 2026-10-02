/**
 * @openapi
 * components: 
 *  schemas:
 *   Personaje:
 *      type: object
 *      description: Representa un personaje del sistema
 *      required:
 *       - id
 *       - nombre
 *       - alias
 *       - juego
 *       - habilidad
 *       - rol
 *      properties:
 *        id:
 *          type: number
 *          example: 1
 *        nombre:
 *          type: string
 *          example: Loki
 *        alias:
 *          type: string
 *          example: Dios de las mentiras
 *        juego:
 *          type: string
 *          example: Marvel Rivals
 *        habilidad:
 *          type: string
 *          example: Hechicero
 *        rol:
 *          type: string
 *          enum:
 *            - Vanguardia
 *            - Ladron
 *            - Jefe
 *            - Ilusionista
 *            - Explorador
 *          example: Ilusionista
 */
export {};