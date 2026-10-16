/**
 * Género de una serie (coincide con los valores del series-service).
 */
export type SerieGenre =
  | 'Drama'
  | 'Comedia'
  | 'Ciencia ficción'
  | 'Thriller'
  | 'Crimen'
  | 'Fantasía'
  | 'Terror'
  | 'Romance'
  | 'Documental'
  | 'Animación';

/** Clasificación por edad. */
export type AgeRating = 'TV-Y' | 'TV-Y7' | 'TV-G' | 'TV-PG' | 'TV-14' | 'TV-MA';

/** Estado de emisión. */
export type SerieStatus = 'En emisión' | 'Finalizada';

/**
 * Representa una serie del catálogo de Netflix.
 */
export interface Serie {
  /** Identificador único */
  id: number;
  /** Título */
  title: string;
  /** Sinopsis */
  synopsis: string;
  /** Género principal */
  genre: SerieGenre;
  /** Año de estreno */
  releaseYear: number;
  /** Número de temporadas */
  seasons: number;
  /** Número de episodios */
  episodes: number;
  /** Calificación (1-10) */
  rating: number;
  /** Reparto principal */
  cast: string[];
  /** País de origen */
  country: string;
  /** Clasificación por edad */
  ageRating: AgeRating;
  /** URL del póster */
  posterUrl: string;
  /** URL de la imagen de fondo */
  backdropUrl: string;
  /** Estado de emisión */
  status: SerieStatus;
}
