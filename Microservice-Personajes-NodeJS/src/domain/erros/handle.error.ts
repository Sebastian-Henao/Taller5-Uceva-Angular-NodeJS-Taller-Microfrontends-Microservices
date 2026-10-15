import { CustomError } from "./custom.error";
import { Response } from "express"

/**
 * Manejador centralizado de errores HTTP
 * 
 * @remarks
 * Esta clase se encarga de procesar errores lanzados durante
 * la ejecucion de la aplicacion y de enviar una respuesta HTTP
 * estandarizada al cliente
 * 
 * Soporta errores personalizado (`CustomError`) y errores
 * genericos no controlados
 */
export class HandleError {

    /**
     * Procesa un error y envia la respuesta HTTP correspondiente
     * 
     * @param error Error capturado durante la ejecucion
     * @param res Objeto de respuesta de Express
     * 
     * @returns Respuesta HTTP con el codigo de estado y mensaje apropiado
     */
    static error(error: unknown, res: Response) {
        console.log(`${error}`);

        if (error instanceof CustomError) {
            return res
              .status(error.statusCode)
              .json({ error: error.message });
        }

        return res
          .status(500)
          .json({ error: 'Internal Server Error' });
    }
}