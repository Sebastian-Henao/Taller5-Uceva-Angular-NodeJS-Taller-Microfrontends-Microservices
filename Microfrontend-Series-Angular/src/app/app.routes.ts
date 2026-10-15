import { Routes } from '@angular/router';

/**
 * Rutas principales de la aplicación Microfrontend Series.
 */
export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/series/series.page').then((m) => m.SeriesPage),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
