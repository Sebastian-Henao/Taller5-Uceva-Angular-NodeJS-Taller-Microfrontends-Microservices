import { Request, Response } from 'express';
import { CustomError } from '../src/domain/erros/custom.error';
import { HandleError } from '../src/domain/erros/handle.error';

describe('HandleError', () => {
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    res = {
      status: statusMock,
      json: jsonMock,
    };
  });

  it('debe responder con el status y mensaje de un CustomError', () => {
    const error = CustomError.badRequest('Dato inválido');
    HandleError.error(error, res as Response);

    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({
      statusCode: 400,
      error: 'Dato inválido',
    });
  });

  it('debe manejar SyntaxError con código 400', () => {
    const syntaxError = new SyntaxError('Unexpected token');
    HandleError.error(syntaxError, res as Response);

    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({
      statusCode: 400,
      error: 'JSON malformado',
    });
  });

  it('debe responder con 500 para errores genéricos no controlados', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const genericError = new Error('Database crash');
    HandleError.error(genericError, res as Response);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      statusCode: 500,
      error: 'Internal Server error',
    });
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('debe funcionar como middleware de Express', () => {
    const error = CustomError.notFound('No encontrado');
    const req = {} as Request;
    const next = jest.fn();

    HandleError.middleware(error, req, res as Response, next);

    expect(statusMock).toHaveBeenCalledWith(404);
    expect(jsonMock).toHaveBeenCalledWith({
      statusCode: 404,
      error: 'No encontrado',
    });
    expect(next).not.toHaveBeenCalled();
  });
});
