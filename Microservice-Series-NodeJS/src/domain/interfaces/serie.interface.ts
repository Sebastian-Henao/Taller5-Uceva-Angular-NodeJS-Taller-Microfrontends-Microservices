/**
 * Géneros disponibles para las series.
 */
export const SERIE_GENRES = [
  'Drama',
  'Comedia',
  'Ciencia ficción',
  'Thriller',
  'Crimen',
  'Fantasía',
  'Terror',
  'Romance',
  'Documental',
  'Animación',
] as const;

/** Género de una serie. */
export type SerieGenre = (typeof SERIE_GENRES)[number];

/** Clasificaciones por edad disponibles. */
export const AGE_RATINGS = ['TV-Y', 'TV-Y7', 'TV-G', 'TV-PG', 'TV-14', 'TV-MA'] as const;

/** Clasificación por edad de una serie. */
export type AgeRating = (typeof AGE_RATINGS)[number];

/** Estados posibles de emisión. */
export const SERIE_STATUSES = ['En emisión', 'Finalizada'] as const;

/** Estado de emisión de una serie. */
export type SerieStatus = (typeof SERIE_STATUSES)[number];

/**
 * Representa una serie del catálogo de Netflix.
 */
export interface Serie {
  /** Identificador único */
  id: number;
  /** Título de la serie */
  title: string;
  /** Sinopsis */
  synopsis: string;
  /** Género principal */
  genre: SerieGenre;
  /** Año de estreno */
  releaseYear: number;
  /** Número de temporadas */
  seasons: number;
  /** Número total de episodios */
  episodes: number;
  /** Calificación de 1 a 10 */
  rating: number;
  /** Reparto principal */
  cast: string[];
  /** País de origen */
  country: string;
  /** Clasificación por edad */
  ageRating: AgeRating;
  /** URL del póster (vertical) */
  posterUrl: string;
  /** URL de la imagen de fondo (horizontal) */
  backdropUrl: string;
  /** Estado de emisión */
  status: SerieStatus;
}
