import { DecimalPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MusicTrack } from '../../interfaces/music-track.interface';
import { MusicService } from '../../services/music/music.service';

type PageState = 'loading' | 'success' | 'error';

/** Vista principal de Sonora: consulta, muestra y filtra la biblioteca musical. */
@Component({
  selector: 'app-music-page',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './music.page.html',
  styleUrl: './music.page.scss',
})
export class MusicPage implements OnInit {
  /** Canciones cargadas desde el microservicio. */
  tracks: MusicTrack[] = [];
  /** Texto utilizado para filtrar canciones por título, artista, álbum o género. */
  searchTerm = '';
  /** Estado de la petición a la API. */
  state: PageState = 'loading';

  private readonly musicService = inject(MusicService);

  ngOnInit(): void {
    this.loadTracks();
  }

  /** Canciones que coinciden con el término de búsqueda actual. */
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

  /** Carga la biblioteca y conserva un estado de error recuperable para la vista. */
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
