/**
 * Configuración de entorno (desarrollo).
 *
 * @remarks
 * Reemplaza a `environment.ts` en el build de desarrollo
 * mediante `fileReplacements` de `angular.json`.
 */
export const environment = {
  /** Indica si es un build de producción */
  production: false,
  /** URL base del microservicio de series */
  seriesApiUrl: 'http://localhost:3005/api/series',
};
