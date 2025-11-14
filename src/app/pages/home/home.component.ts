// Componente de la página principal (home)
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Para navegar entre rutas

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule], // Importa directivas comunes de Angular
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  
  // Inyecta el Router para poder navegar programáticamente
  constructor(private router: Router) {}

  // Navega a la lista de países del continente seleccionado
  goToRegion(regionName: string) {
    console.log('🌍 Navegando a:', regionName);
    // Redirige a /countries/:region (ej: /countries/Americas)
    this.router.navigate(['/countries', regionName]);
  }
}