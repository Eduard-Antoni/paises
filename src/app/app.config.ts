// Configuración principal de la aplicación
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // Necesario para peticiones HTTP

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), // Optimiza la detección de cambios
    provideRouter(routes), // Habilita el sistema de rutas
    provideHttpClient() // Permite usar HttpClient en servicios
  ]
};