import { base, en, Faker } from '@faker-js/faker';
import { CustomError } from '../../../domain/erros/custom.error';
import { PaginatedResponse, SeriesFilters } from '../../../domain/interfaces/pagination.interface';
import {
  AGE_RATINGS,
  Serie,
  SERIE_GENRES,
  SerieGenre,
  SerieStatus,
} from '../../../domain/interfaces/serie.interface';

/** Semilla fija para que el catálogo sea idéntico entre peticiones y reinicios. */
export const SERIES_SEED = 2025;

/** Cantidad de series del catálogo simulado. */
export const SERIES_CATALOG_SIZE = 60;

/** Países de origen posibles. */
const COUNTRIES: readonly string[] = [
  'Estados Unidos', 'España', 'Reino Unido', 'Corea del Sur', 'México', 'Colombia',
  'Japón', 'Alemania', 'Francia', 'Argentina', 'Brasil', 'Suecia', 'India', 'Turquía',
];

/** Fragmentos para construir sinopsis en español. */
const SYNOPSIS_ROLES: readonly string[] = [
  'una detective obstinada', 'un exagente retirado', 'una joven hacker', 'un profesor brillante',
  'una piloto de carreras', 'un chef ambicioso', 'una abogada idealista', 'un científico excéntrico',
];
const SYNOPSIS_EVENTS: readonly string[] = [
  'descubre un secreto que su familia ocultó durante décadas',
  'recibe una misteriosa señal desde el futuro',
  'queda atrapado en una conspiración internacional',
  'hereda un negocio con una deuda imposible de pagar',
  'despierta en un pueblo donde nadie recuerda su nombre',
  'encuentra un diario que predice crímenes antes de que ocurran',
];
const SYNOPSIS_GOALS: readonly string[] = [
  'deberá enfrentarse a sus propios demonios para salvar a quienes ama',
  'tendrá que decidir en quién confiar antes de que sea demasiado tarde',
  'emprenderá una carrera contrarreloj para descubrir la verdad',
  'arriesgará todo para cambiar el destino de su ciudad',
];

/**
 * Servicio encargado de la generación y consulta del catálogo de series.
 *
 * @remarks
 * El catálogo se genera una única vez con `@faker-js/faker` usando una
 * semilla fija (`SERIES_SEED`), por lo que los datos son consistentes
 * entre peticiones.
 */
export class SeriesService {

  /** Catálogo de series generado en memoria. */
  private readonly catalog: readonly Serie[];

  /**
   * Crea el servicio y genera el catálogo.
   *
   * @param size Número de series a generar
   * @param seed Semilla de Faker
   */
  constructor(size: number = SERIES_CATALOG_SIZE, seed: number = SERIES_SEED) {
    const faker = new Faker({ locale: [en, base] });
    faker.seed(seed);
    this.catalog = this.generateCatalog(faker, size);
  }

  /**
   * Devuelve los géneros disponibles.
   *
   * @returns Lista de géneros
   */
  getGenres(): SerieGenre[] {
    return [...SERIE_GENRES];
  }

  /**
   * Devuelve una página de series aplicando los filtros indicados.
   *
   * @param filters Filtros de paginación, género y búsqueda
   * @returns Respuesta paginada de series
   */
  getSeries(filters: SeriesFilters): PaginatedResponse<Serie> {
    const { page, limit, genre, search } = filters;
    const term = search?.toLowerCase();

    const filtered = this.catalog.filter(
      (serie) =>
        (genre === undefined || serie.genre === genre) &&
        (term === undefined || serie.title.toLowerCase().includes(term))
    );

    const start = (page - 1) * limit;

    return {
      data: filtered.slice(start, start + limit),
      page,
      limit,
      total: filtered.length,
      totalPages: Math.ceil(filtered.length / limit),
    };
  }

  /**
   * Busca una serie por su identificador.
   *
   * @param id Identificador de la serie
   * @returns La serie encontrada
   * @throws CustomError 404 si no existe
   */
  getSerieById(id: number): Serie {
    const serie = this.catalog.find((item) => item.id === id);
    if (!serie) {
      throw CustomError.notFound(`Serie con id ${id} no encontrada`);
    }
    return serie;
  }

  /**
   * Genera el catálogo completo de series.
   *
   * @param faker Instancia de Faker con semilla
   * @param size Cantidad de series
   * @returns Catálogo de series
   */
  private generateCatalog(faker: Faker, size: number): Serie[] {
    const usedTitles = new Set<string>();
    const series: Serie[] = [];

    for (let id = 1; id <= size; id++) {
      series.push(this.generateSerie(faker, id, usedTitles));
    }

    return series;
  }

  /**
   * Genera una serie ficticia.
   *
   * @param faker Instancia de Faker con semilla
   * @param id Identificador de la serie
   * @param usedTitles Títulos ya utilizados (para evitar duplicados)
   * @returns Serie generada
   */
  private generateSerie(faker: Faker, id: number, usedTitles: Set<string>): Serie {
    const seasons = faker.number.int({ min: 1, max: 8 });
    const releaseYear = faker.number.int({ min: 2010, max: 2025 });
    const status: SerieStatus =
      releaseYear >= 2020 && faker.datatype.boolean(0.7) ? 'En emisión' : 'Finalizada';

    return {
      id,
      title: this.generateTitle(faker, usedTitles),
      synopsis: this.generateSynopsis(faker),
      genre: faker.helpers.arrayElement(SERIE_GENRES),
      releaseYear,
      seasons,
      episodes: seasons * faker.number.int({ min: 6, max: 13 }),
      rating: faker.number.float({ min: 5, max: 9.8, fractionDigits: 1 }),
      cast: Array.from({ length: faker.number.int({ min: 3, max: 6 }) }, () =>
        faker.person.fullName()
      ),
      country: faker.helpers.arrayElement(COUNTRIES),
      ageRating: faker.helpers.arrayElement(AGE_RATINGS),
      posterUrl: `https://picsum.photos/seed/netflix-serie-${id}/400/600`,
      backdropUrl: `https://picsum.photos/seed/netflix-backdrop-${id}/1280/720`,
      status,
    };
  }

  /**
   * Genera un título único al estilo Netflix (p. ej. "The Silent Harbor").
   *
   * @param faker Instancia de Faker con semilla
   * @param usedTitles Títulos ya utilizados
   * @returns Título único
   */
  private generateTitle(faker: Faker, usedTitles: Set<string>): string {
    const capitalize = (word: string): string => word.charAt(0).toUpperCase() + word.slice(1);
    const prefix = faker.datatype.boolean(0.35) ? 'The ' : '';
    const baseTitle = `${prefix}${capitalize(faker.word.adjective())} ${capitalize(faker.word.noun())}`;

    let title = baseTitle;
    let suffix = 2;
    while (usedTitles.has(title)) {
      title = `${baseTitle} ${suffix++}`;
    }
    usedTitles.add(title);
    return title;
  }

  /**
   * Genera una sinopsis en español a partir de fragmentos.
   *
   * @param faker Instancia de Faker con semilla
   * @returns Sinopsis
   */
  private generateSynopsis(faker: Faker): string {
    const name = faker.person.firstName();
    const role = faker.helpers.arrayElement(SYNOPSIS_ROLES);
    const event = faker.helpers.arrayElement(SYNOPSIS_EVENTS);
    const goal = faker.helpers.arrayElement(SYNOPSIS_GOALS);
    return `Cuando ${name}, ${role}, ${event}, ${goal}.`;
  }
}
