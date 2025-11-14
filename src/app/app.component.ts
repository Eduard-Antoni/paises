// Importaciones necesarias para definir un componente Angular
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Configuración del componente raíz de la aplicación
@Component({
  selector: 'app-root', // Etiqueta HTML para usar este componente
  standalone: true, // Componente standalone (sin NgModule)
  imports: [RouterOutlet], // RouterOutlet permite la navegación entre páginas
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

// Clase del componente con la lógica
export class AppComponent {
  title = 'paises'; // Título de la aplicación
}