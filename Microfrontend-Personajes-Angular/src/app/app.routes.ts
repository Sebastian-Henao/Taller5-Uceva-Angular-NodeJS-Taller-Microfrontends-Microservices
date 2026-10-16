import { Routes } from '@angular/router';

/**
 * Definicios de la rutas principales de la aplicacion
 * 
 * @remarks
 * Este archivo contiene la configuración de enrutamiento
 * utilizada por Angular Router para mapear las URLs
 * a los componentes correspondientes.
 *
 * Incluye:
 * - Rutas de navegación principales
 * - Redirección por defecto para rutas no existentes
 * 
 * @see {@link PersonajesPage}
 */
export const routes: Routes = [

    /**
     * Ruta de personajes
     * 
     * @remarks
     * Renderiza el componente `PersonajesPage`, encargado
     * de mostrar y gestionar el listado de personajes
     */
    { path: '', loadComponent: () => import('./pages/personajes/personajes.page').then((m) => m.PersonajesPage) }
];
