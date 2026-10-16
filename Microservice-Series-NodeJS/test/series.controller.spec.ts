import { Request, Response } from 'express';
import { SeriesController } from '../src/presentation/modules/series/series.controller';
import { SeriesService } from '../src/presentation/modules/series/series.service';

describe('SeriesController', () => {
  let controller: SeriesController;
  let service: SeriesService;
  let res: Partial<Response>;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    service = new SeriesService(10, 777);
    controller = new SeriesController(service);
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    res = {
      status: statusMock,
      json: jsonMock,
    };
  });

  describe('getSeries', () => {
    it('debe responder 200 con valores por defecto cuando no se envían query params', () => {
      const req = { query: {} } as unknown as Request;
      controller.getSeries(req, res as Response);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(
        expect.objectContaining({ page: 1, limit: 12 })
      );
    });

    it('debe responder 200 aplicando filtros válidos de género y búsqueda', () => {
      const req = {
        query: { page: '1', limit: '5', genre: 'Drama', search: 'The' },
      } as unknown as Request;

      controller.getSeries(req, res as Response);
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(
        expect.objectContaining({ page: 1, limit: 5 })
      );
    });

    it('debe soportar parámetros enviados como arreglo', () => {
      const req = {
        query: { page: ['1', '2'], limit: ['5', '10'] },
      } as unknown as Request;

      controller.getSeries(req, res as Response);
      expect(statusMock).toHaveBeenCalledWith(200);
    });

    it('debe responder 400 si page no es un entero positivo', () => {
      const req = { query: { page: '0' } } as unknown as Request;
      controller.getSeries(req, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith(
        expect.objectContaining({ error: expect.stringContaining("parámetro 'page'") })
      );
    });

    it('debe responder 400 si limit excede el máximo permitido', () => {
      const req = { query: { limit: '999' } } as unknown as Request;
      controller.getSeries(req, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith(
        expect.objectContaining({ error: expect.stringContaining("mayor a 50") })
      );
    });

    it('debe responder 400 si el género no es válido', () => {
      const req = { query: { genre: 'Invalido' } } as unknown as Request;
      controller.getSeries(req, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith(
        expect.objectContaining({ error: expect.stringContaining("Género 'Invalido' inválido") })
      );
    });
  });

  describe('getGenres', () => {
    it('debe responder 200 con la lista de géneros', () => {
      const req = {} as Request;
      controller.getGenres(req, res as Response);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(expect.arrayContaining(['Drama', 'Comedia']));
    });

    it('debe manejar errores si el servicio falla', () => {
      jest.spyOn(service, 'getGenres').mockImplementation(() => {
        throw new Error('Crash');
      });
      const req = {} as Request;
      controller.getGenres(req, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
    });
  });

  describe('getSerieById', () => {
    it('debe responder 200 con la serie solicitada', () => {
      const req = { params: { id: '1' } } as unknown as Request;
      controller.getSerieById(req, res as Response);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }));
    });

    it('debe responder 400 si el id no es un número entero positivo', () => {
      const req = { params: { id: 'abc' } } as unknown as Request;
      controller.getSerieById(req, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
    });

    it('debe responder 404 si la serie no existe', () => {
      const req = { params: { id: '99999' } } as unknown as Request;
      controller.getSerieById(req, res as Response);

      expect(statusMock).toHaveBeenCalledWith(404);
    });
  });
});
