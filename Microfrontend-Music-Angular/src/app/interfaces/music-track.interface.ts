/** Información de una canción recibida desde el microservicio de música. */
export interface MusicTrack {
  /** Identificador de la canción dentro de la respuesta. */
  id: number;
  /** Título de la canción. */
  title: string;
  /** Nombre del artista. */
  artist: string;
  /** Álbum al que pertenece la canción. */
  album: string;
  /** Género musical. */
  genre: string;
  /** Año de publicación. */
  releasedYear: number;
  /** Duración total en segundos. */
  durationSeconds: number;
}
