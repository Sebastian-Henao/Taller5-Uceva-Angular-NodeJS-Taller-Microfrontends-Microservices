import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Componente raíz del microfrontend Sonora.
 *
 * Proporciona el punto de montaje para las páginas del microfrontend
 * y delega su renderizado al enrutador de Angular.
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
}
