import { DecimalPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MusicTrack } from '../../interfaces/music-track.interface';
import { MusicService } from '../../services/music/music.service';

/**
 * Estados posibles de la consulta de canciones en la vista.
 *
 * - `loading`: la solicitud al microservicio está en curso.
 * - `success`: la respuesta se recibió correctamente.
 * - `error`: la solicitud falló y se ofrece una opción para reintentar.
 */
type PageState = 'loading' | 'success' | 'error';

/**
 * Vista principal de Sonora: consulta, muestra y filtra la biblioteca musical.
 *
 * La página solicita doce canciones al iniciar, expone los estados de carga,
 * error y éxito, y permite filtrar localmente por título, artista, álbum o género.
 */
@Component({
  selector: 'app-music-page',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './music.page.html',
  styleUrl: './music.page.scss',
})
export class MusicPage implements OnInit {
  /** Canciones cargadas desde el microservicio de música. */
  tracks: MusicTrack[] = [];
  /**
   * Texto utilizado para filtrar canciones por título, artista, álbum o género.
   * La comparación no distingue entre mayúsculas y minúsculas.
   */
  searchTerm = '';
  /** Estado actual de la petición a la API, utilizado para decidir qué mostrar. */
  state: PageState = 'loading';

  /** Servicio responsable de consultar el microservicio de música. */
  private readonly musicService = inject(MusicService);

  /** Inicia la carga de canciones al crear la página. */
  ngOnInit(): void {
    this.loadTracks();
  }

  /**
   * Canciones que coinciden con el término de búsqueda actual.
   *
   * @returns Todas las canciones si el término está vacío; de lo contrario,
   *   solo las canciones coincidentes.
   */
  get filteredTracks(): MusicTrack[] {
    const query = this.searchTerm.trim().toLocaleLowerCase();
    if (!query) {
      return this.tracks;
    }

    return this.tracks.filter((track) =>
      [track.title, track.artist, track.album, track.genre].some((value) =>
        value.toLocaleLowerCase().includes(query),
      ),
    );
  }

  /**
   * Carga doce canciones desde el microservicio.
   *
   * Actualiza el estado para que la plantilla muestre carga o éxito. Si la
   * solicitud falla, registra el error y permite que la persona reintente.
   */
  loadTracks(): void {
    this.state = 'loading';
    this.musicService.getTracks(12).subscribe({
      next: (tracks) => {
        this.tracks = tracks;
        this.state = 'success';
      },
      error: (error: unknown) => {
        console.error('No se pudo cargar la biblioteca musical.', error);
        this.state = 'error';
      },
    });
  }
}
