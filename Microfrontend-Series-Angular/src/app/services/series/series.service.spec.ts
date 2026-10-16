import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { GENRES_MOCK, PAGINATED_SERIES_MOCK, SERIES_MOCK } from '../../mocks/series.mocks';
import { SeriesService } from './series.service';

describe('SeriesService', () => {
  let service: SeriesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(SeriesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe crearse correctamente', () => {
    expect(service).toBeTruthy();
    expect(service.apiUrl).toBe('http://localhost:3005/api/series');
  });

  describe('getSeries', () => {
    it('debe consultar series con parámetros básicos de paginación', () => {
      service.getSeries({ page: 1, limit: 12 }).subscribe((response) => {
        expect(response).toEqual(PAGINATED_SERIES_MOCK);
        expect(response.data.length).toBe(3);
      });

      const req = httpMock.expectOne((r) => r.url === service.apiUrl && r.params.get('page') === '1');
      expect(req.request.method).toBe('GET');
      expect(req.request.params.get('limit')).toBe('12');
      expect(req.request.params.has('genre')).toBe(false);

      req.flush(PAGINATED_SERIES_MOCK);
    });

    it('debe incluir los parámetros de género y búsqueda si se envían', () => {
      service
        .getSeries({ page: 2, limit: 6, genre: 'Drama', search: 'Stranger' })
        .subscribe((response) => {
          expect(response.page).toBe(1);
        });

      const req = httpMock.expectOne(
        (r) =>
          r.url === service.apiUrl &&
          r.params.get('genre') === 'Drama' &&
          r.params.get('search') === 'Stranger'
      );
      expect(req.request.method).toBe('GET');
      req.flush(PAGINATED_SERIES_MOCK);
    });

    it('debe propagar errores en caso de fallo HTTP', () => {
      service.getSeries({ page: 1, limit: 12 }).subscribe({
        next: () => fail('No debe emitir next ante un fallo'),
        error: (error) => {
          expect(error.status).toBe(500);
        },
      });

      const req = httpMock.expectOne((r) => r.url === service.apiUrl);
      req.flush({ error: 'Server error' }, { status: 500, statusText: 'Internal Server Error' });
    });
  });

  describe('getGenres', () => {
    it('debe obtener la lista de géneros disponibles', () => {
      service.getGenres().subscribe((genres) => {
        expect(genres).toEqual(GENRES_MOCK);
      });

      const req = httpMock.expectOne(`${service.apiUrl}/genres`);
      expect(req.request.method).toBe('GET');
      req.flush(GENRES_MOCK);
    });
  });

  describe('getSerieById', () => {
    it('debe obtener el detalle de una serie por su ID', () => {
      const mockSerie = SERIES_MOCK[0]!;
      service.getSerieById(1).subscribe((serie) => {
        expect(serie).toEqual(mockSerie);
        expect(serie.id).toBe(1);
      });

      const req = httpMock.expectOne(`${service.apiUrl}/1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockSerie);
    });
  });
});
