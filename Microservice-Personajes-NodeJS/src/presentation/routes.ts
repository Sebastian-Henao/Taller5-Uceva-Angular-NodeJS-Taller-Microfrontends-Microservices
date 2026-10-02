import { Router } from "express";
import { PersonajesRoutes } from "./modules/personajes.routes";

export class AppRoutes {
    static get routes(): Router {
        const router = Router();

        router.use("/api/personajes", PersonajesRoutes.routes);

        return router;
    }
}