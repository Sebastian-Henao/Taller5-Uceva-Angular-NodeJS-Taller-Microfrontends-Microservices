import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { GENRES_MOCK, PAGINATED_SERIES_MOCK, SERIES_MOCK } from '../../mocks/series.mocks';
import { SeriesService } from '../../services/series/series.service';
import { SeriesPage } from './series.page';

describe('SeriesPage', () => {
  let component: SeriesPage;
  let fixture: ComponentFixture<SeriesPage>;
  let seriesService: SeriesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeriesPage],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(SeriesPage);
    component = fixture.componentInstance;
    seriesService = TestBed.inject(SeriesService);
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe cargar géneros y catálogo de series al inicializar', () => {
    const genresSpy = jest
      .spyOn(seriesService, 'getGenres')
      .mockReturnValue(of(GENRES_MOCK as any));
    const seriesSpy = jest
      .spyOn(seriesService, 'getSeries')
      .mockReturnValue(of(PAGINATED_SERIES_MOCK));

    fixture.detectChanges();

    expect(genresSpy).toHaveBeenCalled();
    expect(seriesSpy).toHaveBeenCalled();
    expect(component.genres).toEqual(GENRES_MOCK);
    expect(component.series).toEqual(SERIES_MOCK);
    expect(component.state).toBe('success');
  });

  it('debe manejar error con mensaje del backend', () => {
    jest.spyOn(seriesService, 'getGenres').mockReturnValue(of([]));
    jest
      .spyOn(seriesService, 'getSeries')
      .mockReturnValue(throwError(() => ({ error: { error: 'Fallo de conexión' } })));
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    fixture.detectChanges();

    expect(component.state).toBe('error');
    expect(component.errorMessage).toBe('Fallo de conexión');
    consoleSpy.mockRestore();
  });

  it('debe manejar error genérico con mensaje por defecto si no viene en error.error', () => {
    jest.spyOn(seriesService, 'getGenres').mockReturnValue(of([]));
    jest
      .spyOn(seriesService, 'getSeries')
      .mockReturnValue(throwError(() => new Error('Network failure')));
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    component.loadSeries();

    expect(component.state).toBe('error');
    expect(component.errorMessage).toContain('No fue posible conectar con el microservicio');
    consoleSpy.mockRestore();
  });

  it('debe manejar error en loadGenres silenciosamente sin romper el componente', () => {
    jest.spyOn(seriesService, 'getGenres').mockReturnValue(throwError(() => new Error('Error')));
    jest.spyOn(seriesService, 'getSeries').mockReturnValue(of(PAGINATED_SERIES_MOCK));

    fixture.detectChanges();

    expect(component.genres.length).toBe(0);
    expect(component.state).toBe('success');
  });

  it('debe filtrar al invocar onGenreChange', () => {
    const spy = jest
      .spyOn(seriesService, 'getSeries')
      .mockReturnValue(of(PAGINATED_SERIES_MOCK));

    component.onGenreChange('Drama');

    expect(component.selectedGenre).toBe('Drama');
    expect(component.currentPage).toBe(1);
    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({ genre: 'Drama', page: 1 })
    );
  });

  it('debe buscar al invocar onSearch con texto', () => {
    const spy = jest
      .spyOn(seriesService, 'getSeries')
      .mockReturnValue(of(PAGINATED_SERIES_MOCK));

    component.searchTerm = 'Dark';
    component.onSearch();

    expect(component.currentPage).toBe(1);
    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({ search: 'Dark', page: 1 })
    );
  });

  it('debe limpiar búsqueda al invocar clearSearch', () => {
    const spy = jest
      .spyOn(seriesService, 'getSeries')
      .mockReturnValue(of(PAGINATED_SERIES_MOCK));

    component.searchTerm = 'Stranger';
    component.clearSearch();

    expect(component.searchTerm).toBe('');
    expect(component.currentPage).toBe(1);
    expect(spy).toHaveBeenCalled();
  });

  it('debe navegar de página al invocar goToPage', () => {
    component.totalPages = 5;
    component.currentPage = 1;
    const spy = jest
      .spyOn(seriesService, 'getSeries')
      .mockReturnValue(of({ ...PAGINATED_SERIES_MOCK, page: 3 }));

    component.goToPage(3);

    expect(component.currentPage).toBe(3);
    expect(spy).toHaveBeenCalledWith(expect.objectContaining({ page: 3 }));
  });

  it('no debe cambiar de página si el destino es inválido o igual al actual', () => {
    component.totalPages = 3;
    component.currentPage = 2;
    const spy = jest.spyOn(seriesService, 'getSeries');

    component.goToPage(2);
    component.goToPage(0);
    component.goToPage(10);

    expect(spy).not.toHaveBeenCalled();
  });

  it('debe abrir y cerrar el detalle de una serie', () => {
    const serie = SERIES_MOCK[0]!;
    component.openDetail(serie);
    expect(component.selectedSerie).toBe(serie);

    component.closeDetail();
    expect(component.selectedSerie).toBeNull();
  });
});
