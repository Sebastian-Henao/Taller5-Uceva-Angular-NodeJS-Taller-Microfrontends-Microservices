import { Router } from "express";
import { PersonajesRoutes } from "./modules/personajes.routes";

/**
 * Clase encargada de centralizar todas las rutas de la aplicacion
 * 
 * @remarks
 * Proporciona un unico punto de acceso a los endpoints del
 * backend.
 */
export class AppRoutes {
    /**
     * Devuelve el router principal de la aplicacion
     * 
     * @returns Router de Express con todas las rutas registradas
     */
    static get routes(): Router {
        const router = Router();

        //Definir rutas
        router.use("/api/personajes", PersonajesRoutes.routes);
        
        return router;
    }
}