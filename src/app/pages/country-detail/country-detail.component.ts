// Componente que muestra el detalle completo de un país específico
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService, Country } from '../../services/countries.service';

@Component({
  selector: 'app-country-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './country-detail.component.html',
  styleUrl: './country-detail.component.scss'
})
export class CountryDetailComponent implements OnInit {
  country: Country | null = null; // País seleccionado (null si no se encuentra)
  regionName: string = ''; // Región del país para el botón de regreso
  loading: boolean = true; // Indica si está cargando datos

  // Inyecta dependencias necesarias
  constructor(
    private route: ActivatedRoute, // Para obtener parámetros de la URL
    private router: Router, // Para navegar entre rutas
    private countriesService: CountriesService // Servicio de datos
  ) {}

  // Se ejecuta al inicializar el componente
  ngOnInit() {
    // Escucha cambios en los parámetros de la ruta
    this.route.params.subscribe(params => {
      this.regionName = params['region']; // Obtiene la región (ej: Americas)
      const countryCode = params['code']; // Obtiene el código del país (ej: MX)
      
      console.log('🔍 Buscando país con código:', countryCode);
      
      this.loadCountry(countryCode);
    });
  }

  // Carga la información del país desde la API
  loadCountry(code: string) {
    this.loading = true;
    
    // Llama al servicio para obtener el país por código
    this.countriesService.getCountryByCode(code).subscribe({
      next: (country: Country | null) => {
        this.country = country; // Guarda el país encontrado
        this.loading = false;
        
        if (country) {
          console.log('✅ País encontrado:', country);
        } else {
          console.error('❌ País no encontrado');
        }
      },
      error: (error: any) => {
        console.error('❌ Error cargando país:', error);
        this.loading = false;
      }
    });
  }

  // Regresa a la lista de países de la región
  goBack() {
    this.router.navigate(['/countries', this.regionName]);
  }

  // Formatea números con separadores de miles
  formatNumber(num: number): string {
    return this.countriesService.formatNumber(num);
  }

  // Maneja errores al cargar la imagen de la bandera
  onImageError(event: any) {
    console.warn('⚠️ Error cargando bandera');
    event.target.src = 'https://via.placeholder.com/400x250/667eea/ffffff?text=Flag';
  }
}