import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BadgeAtom, BadgeType } from '@brejcha13320/design-system-bootstrap';
import { Personaje, RolCategoria } from '../../interfaces/personajes.interface';

@Component({
  selector: 'app-personajes-table',
  imports: [CommonModule, BadgeAtom],
  templateUrl: './personajes-table.component.html',
})
export class PersonajesTableComponent {
  @Input() personajes: Personaje[] = [];

  categoryMap: Record<RolCategoria, BadgeType> = {
    'Vanguardia': 'primary',
    'Ladron': 'danger',
    'Jefe': 'danger',
    'Ilusionista': 'info',
    'Explorador': 'success'
  }
}
