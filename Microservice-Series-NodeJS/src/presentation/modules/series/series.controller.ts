import { Request, Response } from "express";
import { CustomError } from "../../../domain/erros/custom.error";
import { HandleError } from "../../../domain/erros/handle.error";
import { SeriesFilters } from "../../../domain/interfaces/pagination.interface";
import { SERIE_GENRES, SerieGenre } from "../../../domain/interfaces/serie.interface";
import { SeriesService } from "./series.service";

/** Página por defecto. */
const DEFAULT_PAGE = 1;
/** Elementos por página por defecto. */
const DEFAULT_LIMIT = 12;
/** Máximo de elementos por página. */
const MAX_LIMIT = 50;

/**
 * Controlador de series.
 *
 * @remarks
 * Valida los parámetros de entrada de las peticiones HTTP y delega
 * la lógica de negocio al `SeriesService`. Los errores se envían
 * mediante `HandleError`.
 */
export class SeriesController {

  /**
   * Crea el controlador.
   *
   * @param seriesService Servicio de series (inyectable para pruebas)
   */
  constructor(private readonly seriesService: SeriesService = new SeriesService()) {}

  /**
   * `GET /api/series` – Listado paginado con filtros opcionales.
   *
   * @param req Petición de Express
   * @param res Respuesta de Express
   */
  getSeries = (req: Request, res: Response): void => {
    try {
      const filters = this.parseFilters(req.query);
      res.status(200).json(this.seriesService.getSeries(filters));
    } catch (error) {
      HandleError.error(error, res);
    }
  };

  /**
   * `GET /api/series/genres` – Géneros disponibles.
   *
   * @param _req Petición de Express (no utilizada)
   * @param res Respuesta de Express
   */
  getGenres = (_req: Request, res: Response): void => {
    try {
      res.status(200).json(this.seriesService.getGenres());
    } catch (error) {
      HandleError.error(error, res);
    }
  };

  /**
   * `GET /api/series/:id` – Detalle de una serie.
   *
   * @param req Petición de Express
   * @param res Respuesta de Express
   */
  getSerieById = (req: Request, res: Response): void => {
    try {
      const id = this.parsePositiveInt(this.readString(req.params['id']), 'id');
      res.status(200).json(this.seriesService.getSerieById(id));
    } catch (error) {
      HandleError.error(error, res);
    }
  };

  /**
   * Convierte y valida los query params del listado.
   *
   * @param query Query params de la petición
   * @returns Filtros validados
   * @throws CustomError 400 si algún parámetro es inválido
   */
  private parseFilters(query: Request['query']): SeriesFilters {
    const page = this.parsePositiveInt(this.readString(query['page']) ?? `${DEFAULT_PAGE}`, 'page');
    const limit = this.parsePositiveInt(this.readString(query['limit']) ?? `${DEFAULT_LIMIT}`, 'limit');

    if (limit > MAX_LIMIT) {
      throw CustomError.badRequest(`El parámetro 'limit' no puede ser mayor a ${MAX_LIMIT}`);
    }

    const filters: SeriesFilters = { page, limit };

    const genre = this.readString(query['genre']);
    if (genre !== undefined && genre !== '') {
      filters.genre = this.parseGenre(genre);
    }

    const search = this.readString(query['search'])?.trim();
    if (search) {
      filters.search = search;
    }

    return filters;
  }

  /**
   * Valida que un género exista (sin distinguir mayúsculas).
   *
   * @param value Género recibido
   * @returns Género tipado
   * @throws CustomError 400 si el género no existe
   */
  private parseGenre(value: string): SerieGenre {
    const genre = SERIE_GENRES.find((item) => item.toLowerCase() === value.toLowerCase());
    if (!genre) {
      throw CustomError.badRequest(
        `Género '${value}' inválido. Valores permitidos: ${SERIE_GENRES.join(', ')}`
      );
    }
    return genre;
  }

  /**
   * Convierte un valor en entero positivo.
   *
   * @param value Valor a convertir
   * @param name Nombre del parámetro (para el mensaje de error)
   * @returns Entero positivo
   * @throws CustomError 400 si no es un entero positivo
   */
  private parsePositiveInt(value: string | undefined, name: string): number {
    const parsed = Number(value);
    if (!Number.isInteger(parsed) || parsed < 1) {
      throw CustomError.badRequest(`El parámetro '${name}' debe ser un entero positivo`);
    }
    return parsed;
  }

  /**
   * Obtiene un valor string de un query param (toma el primero si es arreglo).
   *
   * @param value Valor crudo del query param
   * @returns String o `undefined`
   */
  private readString(value: unknown): string | undefined {
    if (Array.isArray(value)) {
      return this.readString(value[0]);
    }
    return typeof value === 'string' ? value : undefined;
  }
}
