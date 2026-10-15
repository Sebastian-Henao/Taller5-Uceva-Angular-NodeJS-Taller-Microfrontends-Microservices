import { get } from "env-var";
import "dotenv/config"

/**
 * Variables de entorno utilizadas por la aplicacion
 * 
 * @remarks
 * Este objeto centraliza la lectura y validacion de las variable
 * de entorno necesarias para el correcto funcionamiento del servidor
 * 
 * Las variables son obtenidas mediante `env-var`, lo que permite
 * validar tipos y valores por defecto
 */
export const envs = {
    PORT: get("PORT").required().asPortNumber(),
    PUBLIC_PATH: get("PUBLIC_PATH").default("public").asString(),
};