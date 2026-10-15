import { CustomError } from '../src/domain/erros/custom.error';
import { SERIE_GENRES } from '../src/domain/interfaces/serie.interface';
import {
  SERIES_CATALOG_SIZE,
  SeriesService,
} from '../src/presentation/modules/series/series.service';

describe('SeriesService', () => {
  let service: SeriesService;

  beforeEach(() => {
    service = new SeriesService(20, 1234);
  });

  it('debe inicializar el catálogo con el tamaño configurado', () => {
    const defaultService = new SeriesService();
    const result = defaultService.getSeries({ page: 1, limit: 100 });
    expect(result.total).toBe(SERIES_CATALOG_SIZE);
  });

  it('debe retornar todos los géneros disponibles', () => {
    const genres = service.getGenres();
    expect(genres).toEqual(SERIE_GENRES);
    expect(genres.length).toBe(10);
  });

  it('debe paginar las series correctamente', () => {
    const page1 = service.getSeries({ page: 1, limit: 5 });
    expect(page1.data.length).toBe(5);
    expect(page1.page).toBe(1);
    expect(page1.limit).toBe(5);
    expect(page1.total).toBe(20);
    expect(page1.totalPages).toBe(4);

    const page2 = service.getSeries({ page: 2, limit: 5 });
    expect(page2.data.length).toBe(5);
    expect(page2.data[0]?.id).not.toBe(page1.data[0]?.id);
  });

  it('debe filtrar series por género', () => {
    const dramaSeries = service.getSeries({ page: 1, limit: 50, genre: 'Drama' });
    expect(dramaSeries.data.every((s) => s.genre === 'Drama')).toBe(true);
    expect(dramaSeries.total).toBe(dramaSeries.data.length);
  });

  it('debe filtrar series por término de búsqueda (case insensitive)', () => {
    const all = service.getSeries({ page: 1, limit: 20 });
    const targetTitle = all.data[0]!.title;
    const partial = targetTitle.substring(1, 4).toLowerCase();

    const searchResult = service.getSeries({ page: 1, limit: 20, search: partial });
    expect(searchResult.data.length).toBeGreaterThanOrEqual(1);
    expect(
      searchResult.data.every((s) => s.title.toLowerCase().includes(partial))
    ).toBe(true);
  });

  it('debe retornar una serie por su ID existente', () => {
    const serie = service.getSerieById(1);
    expect(serie).toBeDefined();
    expect(serie.id).toBe(1);
    expect(typeof serie.title).toBe('string');
    expect(typeof serie.rating).toBe('number');
    expect(Array.isArray(serie.cast)).toBe(true);
  });

  it('debe lanzar CustomError 404 al buscar un ID inexistente', () => {
    expect(() => service.getSerieById(9999)).toThrow(CustomError);
    try {
      service.getSerieById(9999);
    } catch (error) {
      expect(error).toBeInstanceOf(CustomError);
      expect((error as CustomError).statusCode).toBe(404);
      expect((error as CustomError).message).toContain('9999 no encontrada');
    }
  });

  it('debe generar datos consistentes y reproducibles con la misma semilla', () => {
    const s1 = new SeriesService(10, 42);
    const s2 = new SeriesService(10, 42);

    expect(s1.getSeries({ page: 1, limit: 10 })).toEqual(
      s2.getSeries({ page: 1, limit: 10 })
    );
  });
});
