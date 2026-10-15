import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MusicTrack } from '../../interfaces/music-track.interface';

/** Acceso HTTP a las canciones expuestas por el microservicio de Música. */
@Injectable({ providedIn: 'root' })
export class MusicService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3003/api/music/tracks';

  /**
   * Solicita una cantidad de canciones generadas por Faker.js.
   * @param count Número de canciones que se solicitarán.
   * @returns Canciones recibidas desde la API REST.
   */
  getTracks(count: number): Observable<MusicTrack[]> {
    return this.http.get<MusicTrack[]>(`${this.apiUrl}/${count}`);
  }
}
