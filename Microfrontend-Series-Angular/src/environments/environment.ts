/**
 * Configuración de entorno (producción).
 *
 * @remarks
 * Centraliza la URL base del microservicio de series para no
 * dejarla quemada en los servicios.
 */
export const environment = {
  /** Indica si es un build de producción */
  production: true,
  /** URL base del microservicio de series */
  seriesApiUrl: 'http://localhost:3005/api/series',
};
