import { HandleError } from "../../domain/erros/handle.error";
import { Request, Response } from "express";
import { PersonajesService } from "./personajes.service";

/**
 * Controlador de personajes
 * 
 * @remarks
 * Esta clase maneja las peticiones HTTP relacionadas con personajes,
 * delegando la logica de negocio al `PersonajeService`,
 */
export class PersonajesController {

    /**
     * Servicio de personajes
     */
    private readonly personajesService = new PersonajesService();

    /**
     * Maneja la peticion HTTP para obtener un listado de personajes
     * 
     * @remarks
     * El numero de personajes a generar se obtiene desde los
     * parametros de la ruta
     * 
     * @param req Objeto de peticion de Express
     * @param res Objeto de respuesta de Express
     */
    getAllPersonajes = (req: Request, res: Response): void => {
        const { countPersonajes } = req.params;

        setTimeout(() => {
            this.personajesService
            .getAllPersonajes(Number(countPersonajes))
            .then((personajes) => res.status(201).json(personajes))
            .catch((error) => HandleError.error(error, res));
        }, 1000);
    };
}