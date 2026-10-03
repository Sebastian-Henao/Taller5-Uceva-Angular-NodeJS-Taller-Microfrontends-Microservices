import { Component, inject } from '@angular/core';
import { PersonajesTableComponent } from '../../components/personajes-table/personajes-table.component';
import { AlertComponent } from '../../components/alert/alert.component';
import { Personaje } from '../../interfaces/personajes.interface';
import { State } from '../../interfaces/state.interface';
import { PersonajesService } from '../../services/personajes/personajes.service';

@Component({
  selector: 'app-personajes',
  imports: [PersonajesTableComponent, AlertComponent],
  templateUrl: './personajes.pages.html',
})
export class PersonajesPages {
  personajes: Personaje[] = [];
    state: State = 'init';

  private personajesService = inject(PersonajesService);

  ngOnInit(): void {
    this.state = 'loading';
    this.personajesService.getAllPersonajes(10).subscribe({
      next: (personajes) => {
        this.personajes = personajes;
        this.state = 'success';
      } ,
      error: (error) => {
        console.error(error)
        this.state = 'error';
      },
    })
  }
}
