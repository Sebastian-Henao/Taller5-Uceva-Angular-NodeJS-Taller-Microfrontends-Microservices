import { Component, inject } from '@angular/core';
import { PersonajesTableComponent } from '../../components/personajes-table/personajes-table.component';
import { AlertComponent } from '../../components/alert/alert.component';
import { Personaje } from '../../interfaces/personajes.interface';
import { State } from '../../interfaces/state.interface';
import { PersonajesService } from '../../services/personajes/personajes.service';

/**
 * Componente contenedor de personajes
 * 
 * Se utiliza para gestionar y mostrar un listado de personajes
 * utilizando el componente `PersonajesTableComponent`
 * 
 * @remarks
 * Este componente se encarga de consumir el servicio
 * `PersonajesService` para obtener los personajes y pasarlos
 * al componente de tabla
 * Forma parte de la capa de presentacion de la aplicacion
 */
@Component({
  selector: 'app-personajes',
  imports: [PersonajesTableComponent, AlertComponent],
  templateUrl: './personajes.page.html',
})
export class PersonajesPage {
  /**
   * Listado de personajes obtenidos desde el servicio
   * @type {Personaje[]}
   */
  personajes: Personaje[] = [];

    /** Estado actual del componente
     * 
     * @default 'init'
     */
    state: State = 'init';

    /**
     * Servicio para obtener personajes
     * 
     * @remarks
     * Se inyyecta utilizando la funcion `inject()` de Angular
     */
    private personajesService = inject(PersonajesService);

    /**
     * Inicializa el componente y carga los personajes.
     * 
     * @remarks
     * Se suscribe al metodo `getAllPersonajes()` del servicio
     * y asigna los datos recibidos a la propiedad `personajes`
     */
    ngOnInit(): void {
      this.state = 'loading';
      this.personajesService.getAllPersonajes(10).subscribe({
        next: (personajes) => {
          this.personajes = personajes;
          this.state = 'success';
        },
        error: (error) => {
          console.error(error)
          this.state = 'error'
        },
      })
    }
}
