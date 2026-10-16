/**
 * Error personalizado para la aplicación.
 *
 * @remarks
 * Extiende `Error` y asocia un código de estado HTTP, permitiendo
 * estandarizar el manejo de errores en controladores y servicios.
 *
 * @example
 * ```ts
 * throw CustomError.notFound('Serie no encontrada');
 * ```
 */
export class CustomError extends Error {

  /**
   * Crea una nueva instancia de `CustomError`.
   *
   * @param statusCode Código de estado HTTP asociado al error
   * @param message Mensaje descriptivo del error
   */
  constructor(
    public readonly statusCode: number,
    public override readonly message: string
  ) {
    super(message);
    this.name = 'CustomError';
  }

  /**
   * Error HTTP 400 – Bad Request.
   *
   * @param message Mensaje descriptivo del error
   * @returns Instancia de `CustomError` con código 400
   */
  static badRequest(message: string): CustomError {
    return new CustomError(400, message);
  }

  /**
   * Error HTTP 404 – Not Found.
   *
   * @param message Mensaje descriptivo del error
   * @returns Instancia de `CustomError` con código 404
   */
  static notFound(message: string): CustomError {
    return new CustomError(404, message);
  }

  /**
   * Error HTTP 500 – Internal Server Error.
   *
   * @param message Mensaje descriptivo del error
   * @returns Instancia de `CustomError` con código 500
   */
  static internalServer(message: string): CustomError {
    return new CustomError(500, message);
  }
}
