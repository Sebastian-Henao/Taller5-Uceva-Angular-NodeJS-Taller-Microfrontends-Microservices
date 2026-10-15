import { Router } from "express";

/**
 * Configuracion de opciones para el servidor
 */
export interface Options {
    /** Puerto donde se levantara el servidor */
    port: number;

    /** Ruta al directorio publico (archivos estaticos) */
    publicPath: string;

    /** Router principal de la aplicacion */
    routes: Router;
}