import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Serie } from '../../interfaces/serie.interface';

/**
 * Componente que representa la tarjeta visual de una serie al estilo Netflix.
 *
 * @description
 * Muestra el póster, título, género, calificación y año de estreno.
 * Al hacer clic, emite el evento `selectSerie` con la serie seleccionada.
 */
@Component({
  selector: 'app-series-card',
  templateUrl: './series-card.component.html',
  imports: [CommonModule],
})
export class SeriesCardComponent {
  /**
   * Serie a renderizar en la tarjeta.
   */
  @Input({ required: true }) serie!: Serie;

  /**
   * Evento emitido al seleccionar la serie para ver su detalle.
   */
  @Output() selectSerie = new EventEmitter<Serie>();

  /**
   * Maneja el clic en la tarjeta o botón de detalle.
   */
  onCardClick(): void {
    this.selectSerie.emit(this.serie);
  }
}
