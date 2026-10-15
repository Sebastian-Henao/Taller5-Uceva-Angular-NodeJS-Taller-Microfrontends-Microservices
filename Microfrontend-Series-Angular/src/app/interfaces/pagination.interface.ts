import { SerieGenre } from './serie.interface';

/**
 * Respuesta paginada del series-service.
 *
 * @typeParam T Tipo de los elementos
 */
export interface PaginatedResponse<T> {
  /** Elementos de la página */
  data: T[];
  /** Página actual */
  page: number;
  /** Elementos por página */
  limit: number;
  /** Total de elementos */
  total: number;
  /** Total de páginas */
  totalPages: number;
}

/**
 * Filtros para consultar el listado de series.
 */
export interface SeriesFilters {
  /** Página (base 1) */
  page: number;
  /** Elementos por página */
  limit: number;
  /** Género a filtrar (opcional) */
  genre?: SerieGenre | null;
  /** Texto a buscar en el título (opcional) */
  search?: string;
}
