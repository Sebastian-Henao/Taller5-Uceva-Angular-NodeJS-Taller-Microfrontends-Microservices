import { SerieGenre } from './serie.interface';

/**
 * Respuesta paginada genérica.
 *
 * @typeParam T Tipo de los elementos de la página
 */
export interface PaginatedResponse<T> {
  /** Elementos de la página actual */
  data: T[];
  /** Página actual (base 1) */
  page: number;
  /** Elementos por página */
  limit: number;
  /** Total de elementos que cumplen el filtro */
  total: number;
  /** Total de páginas */
  totalPages: number;
}

/**
 * Filtros aceptados por el listado de series.
 */
export interface SeriesFilters {
  /** Página solicitada (base 1) */
  page: number;
  /** Elementos por página */
  limit: number;
  /** Género por el que filtrar */
  genre?: SerieGenre;
  /** Texto a buscar en el título */
  search?: string;
}

/**
 * Cuerpo estándar de una respuesta de error.
 */
export interface ErrorResponse {
  /** Código de estado HTTP */
  statusCode: number;
  /** Mensaje descriptivo */
  error: string;
}
