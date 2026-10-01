/**
 * Interfaz que representa un personaje
 * 
 * Contiene la informacion basica necesaria para mostrar un personajes
 * en la tabla o en cualquier componente de listado
 */
export interface Personaje {
    /**Identificador unico del personaje */
    id: number;

    /**Nombre del personaje */
    nombre: string;

    /**Alias del personaje */
    alias: string;

    /**Juego al que pertenece el personaje */
    juego: string;

    /**Habilidad del personaje */
    habilidad: string;

    /**Rol del persoanje en el juego */
    rol: RolCategoria;
}

/**
 * Tipo de categoria de rol
 * 
 * @remarks
 * Este tipo restringe los roles a los valores predefinidos
 * Se utiliza principalemnte para mapear badges de colores en la UI
 */
export type RolCategoria = 'Vanguardia' | 'Ladron' | 'Jefe' | 'Ilusionista' | 'Explorador';