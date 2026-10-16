import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../interfaces/pagination.interface";
import { CustomError } from "./custom.error";

/**
 * Manejador centralizado de errores HTTP.
 *
 * @remarks
 * Procesa los errores lanzados durante la ejecución y envía una
 * respuesta HTTP tipada (`ErrorResponse`). Soporta errores
 * personalizados (`CustomError`), JSON malformado y errores genéricos.
 */
export class HandleError {

  /**
   * Procesa un error y envía la respuesta HTTP correspondiente.
   *
   * @param error Error capturado durante la ejecución
   * @param res Objeto de respuesta de Express
   * @returns Respuesta HTTP con el código de estado y mensaje apropiado
   */
  static error(error: unknown, res: Response): Response<ErrorResponse> {
    if (error instanceof CustomError) {
      return res
        .status(error.statusCode)
        .json(HandleError.body(error.statusCode, error.message));
    }

    if (error instanceof SyntaxError) {
      return res.status(400).json(HandleError.body(400, 'JSON malformado'));
    }

    console.error(`[series-service] ${String(error)}`);
    return res.status(500).json(HandleError.body(500, 'Internal Server error'));
  }

  /**
   * Middleware de Express para errores no controlados.
   *
   * @param error Error propagado por Express
   * @param _req Petición (no utilizada)
   * @param res Respuesta de Express
   * @param _next Siguiente middleware (requerido por la firma de Express)
   */
  static middleware(error: unknown, _req: Request, res: Response, _next: NextFunction): void {
    HandleError.error(error, res);
  }

  /**
   * Construye el cuerpo estándar de error.
   *
   * @param statusCode Código HTTP
   * @param message Mensaje de error
   * @returns Objeto `ErrorResponse`
   */
  private static body(statusCode: number, message: string): ErrorResponse {
    return { statusCode, error: message };
  }
}
