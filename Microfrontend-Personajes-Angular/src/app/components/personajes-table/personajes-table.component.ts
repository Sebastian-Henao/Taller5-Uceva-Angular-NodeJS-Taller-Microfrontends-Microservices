import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BadgeAtom, BadgeType } from '@brejcha13320/design-system-bootstrap';
import { Personaje, RolCategoria } from '../../interfaces/personajes.interface';

/**
 * Componente de tabla de personajes
 * 
 * Se utiliza para mostrar un listado de personajes en una
 * tabla, mostrabdo informacion como nombre, alias, juego, habilidad
 * y un badge visual que indica el rol de cada personaje
 * 
 * @remarks
 * Este componente recibe los personaje desde un componente
 * padre a traves del Input `personajes` y utiliza el mapeo `categoryMap`
 * para asignar colores a los badges segun el rol
 * 
 * Forma parte de la capa de presentacion de la aplicacion y
 * se considera un **organismo** dentro del sistema de diseño atomico
 */
@Component({
  selector: 'app-personajes-table',
  imports: [CommonModule, BadgeAtom],
  templateUrl: './personajes-table.component.html',
})
export class PersonajesTableComponent {
  /**
   * Listado de personajes que se mostraran en la tabla
   * @type {Personaje[]}
   * @remarks
   * Este Input permite pasar un array de personajes desde un
   * componente padre, generalmente `ListPersonajesComponent`
   * 
   * Cada personaje debe cumplir la interfaz `Personaje`
   */
  @Input() personajes: Personaje[] = [];
  /**
   * Mapeo de roles de personajes a tipos de Badge
   * 
   * @type {Record<RolCategoria, BadgeType>}
   * @remarks
   * Se utiliza para signar colores de Badges a cada rol
   * 
   * Esto permite que en la tabla cada personaje tenga un
   * badge visual que indique su rol de forma clara para
   * el usuario
   */
  categoryMap: Record<RolCategoria, BadgeType> = {
    'Vanguardia': 'primary',
    'Ladron': 'dark',
    'Jefe': 'danger',
    'Ilusionista': 'info',
    'Explorador': 'success',
  }
}
