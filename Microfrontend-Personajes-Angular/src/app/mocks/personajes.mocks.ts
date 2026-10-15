import { Personaje } from "../interfaces/personajes.interface";

/**
 * Conjunto de datos de prueba (mock) para el módulo Personajes
 */
export const PERSONAJES_MOCK: Personaje[] = [
    {
        id: 1,
        nombre: 'Loki',
        alias: 'Dios de las mentiras',
        juego: 'Marvel Rivals',
        habilidad: 'Hechicero',
        rol: 'Ilusionista'
    },
    {
        id: 2,
        nombre: 'Nathan Drake',
        alias: 'Nate',
        juego: 'Uncharted',
        habilidad: 'Experto en armas y supervivencia',
        rol: 'Ladron'
    }
];