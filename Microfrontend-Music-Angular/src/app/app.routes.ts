import { Routes } from '@angular/router';
import { MusicPage } from './pages/music/music.page';

/**
 * Rutas locales del microfrontend de Música.
 *
 * La ruta raíz presenta la biblioteca musical y las rutas desconocidas
 * regresan a la página principal.
 */
export const routes: Routes = [
  /** Muestra la biblioteca musical. */
  { path: '', component: MusicPage },
  /** Redirige rutas desconocidas a la biblioteca musical. */
  { path: '**', redirectTo: '' },
];
