// Punto de entrada de la aplicación Angular
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Inicia la aplicación con el componente raíz y su configuración
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err)); // Captura errores de inicio