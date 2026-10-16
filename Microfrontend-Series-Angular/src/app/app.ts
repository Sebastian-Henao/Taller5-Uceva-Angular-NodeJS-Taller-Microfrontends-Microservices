import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Componente raíz del Microfrontend de Series.
 */
@Component({
  selector: 'app-root',
  template: '<router-outlet />',
  styleUrl: './app.scss',
  imports: [RouterOutlet],
})
export class App {}
