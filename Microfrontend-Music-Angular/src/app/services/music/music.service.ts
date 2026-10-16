import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MusicTrack } from '../../interfaces/music-track.interface';

/**
 * Acceso HTTP a las canciones expuestas por el microservicio de Música.
 *
 * Centraliza la URL del servicio y devuelve respuestas fuertemente tipadas
 * con el contrato {@link MusicTrack}.
 */
@Injectable({ providedIn: 'root' })
export class MusicService {
  /** Cliente HTTP de Angular utilizado para llamar a la API REST. */
  private readonly http = inject(HttpClient);
  /** Endpoint base del microservicio de música. */
  private readonly apiUrl = 'http://localhost:3004/api/music/tracks';

  /**
   * Solicita una cantidad de canciones generadas por Faker.js.
   *
   * @param count Número de canciones que se solicitarán.
   * @returns Canciones recibidas desde la API REST.
   *
   * @example
   * ```ts
   * this.musicService.getTracks(12).subscribe((tracks) => {
   *   this.tracks = tracks;
   * });
   * ```
   */
  getTracks(count: number): Observable<MusicTrack[]> {
    return this.http.get<MusicTrack[]>(`${this.apiUrl}/${count}`);
  }
}
