import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Serie } from '../../interfaces/serie.interface';

/**
 * Componente que muestra el detalle completo de una serie de Netflix en formato modal/overlay.
 *
 * @description
 * Muestra imagen de fondo (backdrop), póster, sinopsis completa, reparto,
 * temporadas, episodios, país y estado de emisión.
 */
@Component({
  selector: 'app-series-detail',
  templateUrl: './series-detail.component.html',
  imports: [CommonModule],
})
export class SeriesDetailComponent {
  /**
   * Serie de la cual se muestran los detalles.
   */
  @Input({ required: true }) serie!: Serie;

  /**
   * Evento emitido al cerrar la vista de detalle.
   */
  @Output() close = new EventEmitter<void>();

  /**
   * Cierra el modal de detalle.
   */
  onClose(): void {
    this.close.emit();
  }
}
