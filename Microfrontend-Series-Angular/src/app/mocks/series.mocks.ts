import { PaginatedResponse } from '../interfaces/pagination.interface';
import { Serie } from '../interfaces/serie.interface';

/**
 * Datos simulados de series de Netflix para pruebas unitarias.
 */
export const SERIES_MOCK: Serie[] = [
  {
    id: 1,
    title: 'Stranger Things',
    synopsis: 'Un grupo de niños investiga la desaparición de su amigo y descubre misterios sobrenaturales.',
    genre: 'Ciencia ficción',
    releaseYear: 2016,
    seasons: 4,
    episodes: 34,
    rating: 8.7,
    cast: ['Millie Bobby Brown', 'Finn Wolfhard', 'Winona Ryder'],
    country: 'Estados Unidos',
    ageRating: 'TV-14',
    posterUrl: 'https://picsum.photos/seed/netflix-serie-1/400/600',
    backdropUrl: 'https://picsum.photos/seed/netflix-backdrop-1/1280/720',
    status: 'En emisión',
  },
  {
    id: 2,
    title: 'La Casa de Papel',
    synopsis: 'Un misterioso hombre conocido como El Profesor planea el mayor atraco de la historia.',
    genre: 'Crimen',
    releaseYear: 2017,
    seasons: 5,
    episodes: 41,
    rating: 8.2,
    cast: ['Úrsula Corberó', 'Álvaro Morte', 'Itziar Ituño'],
    country: 'España',
    ageRating: 'TV-MA',
    posterUrl: 'https://picsum.photos/seed/netflix-serie-2/400/600',
    backdropUrl: 'https://picsum.photos/seed/netflix-backdrop-2/1280/720',
    status: 'Finalizada',
  },
  {
    id: 3,
    title: 'Dark',
    synopsis: 'La desaparición de dos niños en un pueblo alemán expone las dobles vidas y relaciones rotas.',
    genre: 'Thriller',
    releaseYear: 2017,
    seasons: 3,
    episodes: 26,
    rating: 8.7,
    cast: ['Louis Hofmann', 'Oliver Masucci', 'Jördis Triebel'],
    country: 'Alemania',
    ageRating: 'TV-MA',
    posterUrl: 'https://picsum.photos/seed/netflix-serie-3/400/600',
    backdropUrl: 'https://picsum.photos/seed/netflix-backdrop-3/1280/720',
    status: 'Finalizada',
  },
];

/**
 * Respuesta paginada simulada para pruebas.
 */
export const PAGINATED_SERIES_MOCK: PaginatedResponse<Serie> = {
  data: SERIES_MOCK,
  page: 1,
  limit: 12,
  total: 3,
  totalPages: 1,
};

/**
 * Lista simulada de géneros para pruebas.
 */
export const GENRES_MOCK: string[] = [
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
];
