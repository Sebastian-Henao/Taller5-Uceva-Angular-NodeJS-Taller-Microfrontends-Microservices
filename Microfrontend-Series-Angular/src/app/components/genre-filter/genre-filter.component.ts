import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SerieGenre } from '../../interfaces/serie.interface';

/**
 * Componente para filtrar series por género.
 *
 * @description
 * Muestra botones tipo píldora para seleccionar "Todos" o un género específico.
 * Emite `genreChange` con el género seleccionado o `null` para todos.
 */
@Component({
  selector: 'app-genre-filter',
  templateUrl: './genre-filter.component.html',
  imports: [CommonModule],
})
export class GenreFilterComponent {
  /**
   * Lista de géneros disponibles para renderizar.
   */
  @Input() genres: SerieGenre[] = [];

  /**
   * Género actualmente seleccionado (o null si es "Todos").
   */
  @Input() selectedGenre: SerieGenre | null = null;

  /**
   * Evento emitido al cambiar el género seleccionado.
   */
  @Output() genreChange = new EventEmitter<SerieGenre | null>();

  /**
   * Selecciona un género y notifica al componente padre.
   *
   * @param genre Género elegido o null para todos
   */
  selectGenre(genre: SerieGenre | null): void {
    if (this.selectedGenre !== genre) {
      this.selectedGenre = genre;
      this.genreChange.emit(genre);
    }
  }
}
