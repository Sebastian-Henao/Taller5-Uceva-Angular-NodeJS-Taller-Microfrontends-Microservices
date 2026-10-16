import { CustomError } from '../src/domain/erros/custom.error';

describe('CustomError', () => {
  it('debe instanciar correctamente con código y mensaje', () => {
    const error = new CustomError(418, "I'm a teapot");
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(CustomError);
    expect(error.statusCode).toBe(418);
    expect(error.message).toBe("I'm a teapot");
    expect(error.name).toBe('CustomError');
  });

  it('debe crear un error badRequest (400)', () => {
    const error = CustomError.badRequest('Parámetro inválido');
    expect(error.statusCode).toBe(400);
    expect(error.message).toBe('Parámetro inválido');
  });

  it('debe crear un error notFound (404)', () => {
    const error = CustomError.notFound('Recurso no encontrado');
    expect(error.statusCode).toBe(404);
    expect(error.message).toBe('Recurso no encontrado');
  });

  it('debe crear un error internalServer (500)', () => {
    const error = CustomError.internalServer('Fallo interno');
    expect(error.statusCode).toBe(500);
    expect(error.message).toBe('Fallo interno');
  });
});
