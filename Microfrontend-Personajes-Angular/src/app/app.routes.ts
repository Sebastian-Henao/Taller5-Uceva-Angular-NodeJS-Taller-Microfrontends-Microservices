import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./pages/personajes/personajes.page').then((m) => m.PersonajesPage) }
];
