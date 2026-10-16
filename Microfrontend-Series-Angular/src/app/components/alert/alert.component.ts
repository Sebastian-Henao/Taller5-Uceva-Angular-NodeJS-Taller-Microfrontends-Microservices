import { Component, Input } from '@angular/core';
import { AlertState } from '../../interfaces/state.interface';

/**
 * Componente reutilizable para mostrar estados de alerta (carga o error).
 *
 * @description
 * Muestra un banner visual con icono y texto según el estado de la operación.
 *
 * @example
 * ```html
 * <app-alert [alertState]="'loading'" text="Cargando catálogo de Netflix..." />
 * ```
 */
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
})
export class AlertComponent {
  /**
   * Estado de la alerta ('loading' o 'error').
   */
  @Input({ required: true }) alertState!: AlertState;

  /**
   * Mensaje descriptivo a mostrar.
   */
  @Input() text: string = '';

  /**
   * Mapeo de clases de estilo Bootstrap según el estado.
   */
  readonly alertClassMap: Record<AlertState, 'primary' | 'danger'> = {
    error: 'danger',
    loading: 'primary',
  };

  /**
   * Retorna la clase CSS del contenedor de la alerta.
   */
  getClass(): string {
    const color = this.alertClassMap[this.alertState];
    return `alert alert-${color} d-flex align-items-center justify-content-center py-3 my-4`;
  }
}
