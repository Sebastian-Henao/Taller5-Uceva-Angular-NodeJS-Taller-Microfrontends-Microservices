import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PaginatedResponse, SeriesFilters } from '../../interfaces/pagination.interface';
import { Serie, SerieGenre } from '../../interfaces/serie.interface';

/**
 * Servicio encargado de la comunicación HTTP con el microservicio de Series.
 *
 * @description
 * Consume los endpoints REST de series, géneros y detalle utilizando `HttpClient`.
 * La URL base se obtiene dinámicamente desde el archivo de `environment`.
 *
 * @example
 * ```ts
 * const seriesService = inject(SeriesService);
 * seriesService.getSeries({ page: 1, limit: 12 }).subscribe(res => console.log(res.data));
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class SeriesService {
  /**
   * Cliente HTTP de Angular inyectado.
   */
  private readonly http = inject(HttpClient);

  /**
   * URL base de la API de series obtenida de la configuración de entorno.
   */
  readonly apiUrl = environment.seriesApiUrl;

  /**
   * Obtiene un listado paginado de series desde el backend con filtros opcionales.
   *
   * @param filters Filtros de paginación, género y búsqueda
   * @returns Observable con la respuesta paginada de series
   *
   * @example
   * ```ts
   * this.seriesService.getSeries({ page: 1, limit: 10, genre: 'Drama' })
   *   .subscribe(response => this.series = response.data);
   * ```
   */
  getSeries(filters: SeriesFilters): Observable<PaginatedResponse<Serie>> {
    let params = new HttpParams()
      .set('page', filters.page.toString())
      .set('limit', filters.limit.toString());

    if (filters.genre) {
      params = params.set('genre', filters.genre);
    }

    if (filters.search && filters.search.trim().length > 0) {
      params = params.set('search', filters.search.trim());
    }

    return this.http.get<PaginatedResponse<Serie>>(this.apiUrl, { params });
  }

  /**
   * Obtiene la lista de géneros disponibles en el catálogo.
   *
   * @returns Observable con el arreglo de nombres de géneros
   *
   * @example
   * ```ts
   * this.seriesService.getGenres().subscribe(genres => this.genres = genres);
   * ```
   */
  getGenres(): Observable<SerieGenre[]> {
    return this.http.get<SerieGenre[]>(`${this.apiUrl}/genres`);
  }

  /**
   * Obtiene la información detallada de una serie por su ID.
   *
   * @param id Identificador numérico de la serie
   * @returns Observable con la serie encontrada
   *
   * @example
   * ```ts
   * this.seriesService.getSerieById(5).subscribe(serie => this.selectedSerie = serie);
   * ```
   */
  getSerieById(id: number): Observable<Serie> {
    return this.http.get<Serie>(`${this.apiUrl}/${id}`);
  }
}
