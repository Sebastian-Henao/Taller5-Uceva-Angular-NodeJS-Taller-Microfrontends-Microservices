import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from '../../components/alert/alert.component';
import { GenreFilterComponent } from '../../components/genre-filter/genre-filter.component';
import { SeriesCardComponent } from '../../components/series-card/series-card.component';
import { SeriesDetailComponent } from '../../components/series-detail/series-detail.component';
import { PaginatedResponse, SeriesFilters } from '../../interfaces/pagination.interface';
import { Serie, SerieGenre } from '../../interfaces/serie.interface';
import { State } from '../../interfaces/state.interface';
import { SeriesService } from '../../services/series/series.service';

/**
 * Página principal del microfrontend de Series de Netflix.
 *
 * @description
 * Componente expuesto a través de Module Federation (`./SeriesPage`).
 * Consume el `SeriesService` para cargar el catálogo de series, filtrar
 * por género, buscar por título, paginar resultados y desplegar la vista
 * detallada de una serie.
 */
@Component({
  selector: 'app-series-page',
  templateUrl: './series.page.html',
  imports: [
    CommonModule,
    FormsModule,
    AlertComponent,
    GenreFilterComponent,
    SeriesCardComponent,
    SeriesDetailComponent,
  ],
})
export class SeriesPage implements OnInit {
  /**
   * Servicio inyectado de series.
   */
  private readonly seriesService = inject(SeriesService);

  /**
   * Estado asíncrono actual del componente.
   */
  state: State = 'init';

  /**
   * Catálogo de series obtenido en la página actual.
   */
  series: Serie[] = [];

  /**
   * Géneros disponibles en el catálogo.
   */
  genres: SerieGenre[] = [];

  /**
   * Género actualmente seleccionado como filtro.
   */
  selectedGenre: SerieGenre | null = null;

  /**
   * Término de búsqueda de texto ingresado por el usuario.
   */
  searchTerm: string = '';

  /**
   * Página actual (base 1).
   */
  currentPage: number = 1;

  /**
   * Cantidad de elementos por página.
   */
  pageSize: number = 12;

  /**
   * Total de páginas disponibles según los filtros.
   */
  totalPages: number = 1;

  /**
   * Total de series encontradas.
   */
  totalSeries: number = 0;

  /**
   * Serie seleccionada para desplegar en el modal de detalle.
   */
  selectedSerie: Serie | null = null;

  /**
   * Mensaje de error a desplegar en caso de fallo HTTP.
   */
  errorMessage: string = '';

  /**
   * Inicializa el componente cargando géneros y catálogo inicial.
   */
  ngOnInit(): void {
    this.loadGenres();
    this.loadSeries();
  }

  /**
   * Carga los géneros disponibles desde el backend.
   */
  loadGenres(): void {
    this.seriesService.getGenres().subscribe({
      next: (genres) => {
        this.genres = genres;
      },
      error: () => {
        // Los géneros se pueden reintentar sin romper la vista
      },
    });
  }

  /**
   * Consulta el catálogo de series con los filtros activos.
   */
  loadSeries(): void {
    this.state = 'loading';
    this.errorMessage = '';

    const filters: SeriesFilters = {
      page: this.currentPage,
      limit: this.pageSize,
      genre: this.selectedGenre,
      search: this.searchTerm.trim() || undefined,
    };

    this.seriesService.getSeries(filters).subscribe({
      next: (response: PaginatedResponse<Serie>) => {
        this.series = response.data;
        this.currentPage = response.page;
        this.totalPages = response.totalPages || 1;
        this.totalSeries = response.total;
        this.state = 'success';
      },
      error: (error) => {
        console.error('[SeriesPage] Error al cargar series:', error);
        this.errorMessage =
          error?.error?.error ||
          'No fue posible conectar con el microservicio de series (puerto 3005).';
        this.state = 'error';
      },
    });
  }

  /**
   * Manejador de cambio de género desde el componente filtro.
   *
   * @param genre Género seleccionado o null para todos
   */
  onGenreChange(genre: SerieGenre | null): void {
    this.selectedGenre = genre;
    this.currentPage = 1;
    this.loadSeries();
  }

  /**
   * Ejecuta la búsqueda al presionar enter o clic en buscar.
   */
  onSearch(): void {
    this.currentPage = 1;
    this.loadSeries();
  }

  /**
   * Limpia el buscador y recarga el catálogo.
   */
  clearSearch(): void {
    this.searchTerm = '';
    this.currentPage = 1;
    this.loadSeries();
  }

  /**
   * Cambia a una página específica.
   *
   * @param page Número de página
   */
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.loadSeries();
    }
  }

  /**
   * Abre el modal de detalle para la serie indicada.
   *
   * @param serie Serie seleccionada
   */
  openDetail(serie: Serie): void {
    this.selectedSerie = serie;
  }

  /**
   * Cierra el modal de detalle.
   */
  closeDetail(): void {
    this.selectedSerie = null;
  }
}
