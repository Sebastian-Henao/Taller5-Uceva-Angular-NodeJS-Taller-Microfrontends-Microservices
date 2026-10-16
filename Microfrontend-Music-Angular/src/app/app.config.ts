import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

/**
 * Configuración global de la aplicación Sonora.
 *
 * Registra los servicios de Angular necesarios para manejar errores globales,
 * detectar cambios, navegar entre rutas y realizar peticiones HTTP.
 */
export const appConfig: ApplicationConfig = {
  /** Proveedores compartidos por los componentes de la aplicación. */
  providers: [
    /** Escucha errores globales no controlados del navegador. */
    provideBrowserGlobalErrorListeners(),
    /** Habilita la detección de cambios basada en Zone.js. */
    provideZoneChangeDetection({ eventCoalescing: true }),
    /** Registra las rutas locales disponibles en el microfrontend. */
    provideRouter(routes),
    /** Habilita HttpClient para consumir la API de música. */
    provideHttpClient(),
  ],
};
