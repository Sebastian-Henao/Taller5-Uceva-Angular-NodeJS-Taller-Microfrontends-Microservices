import "dotenv/config";
import { get } from "env-var";

/**
 * Variables de entorno utilizadas por el microservicio de series.
 *
 * @remarks
 * Centraliza la lectura y validación de las variables de entorno
 * mediante `env-var`.
 *
 * @example
 * ```ts
 * console.log(envs.PORT);
 * ```
 */
export const envs = {
  /** Puerto HTTP del microservicio */
  PORT: get("PORT").default(3005).asPortNumber(),
  /** Carpeta de archivos estáticos */
  PUBLIC_PATH: get("PUBLIC_PATH").default("public").asString(),
  /** Orígenes permitidos por CORS */
  CORS_ORIGINS: get("CORS_ORIGINS")
    .default("http://localhost:4205,http://localhost:4200")
    .asArray(","),
};
