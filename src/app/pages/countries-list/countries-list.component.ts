// Componente que muestra la lista de países por región
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Para usar ngModel en el buscador
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService, Country } from '../../services/countries.service';

@Component({
  selector: 'app-countries-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './countries-list.component.html',
  styleUrl: './countries-list.component.scss'
})
export class CountriesListComponent implements OnInit {
  regionName: string = ''; // Región seleccionada (Americas, Africa, etc)
  countries: Country[] = []; // Todos los países de la región
  filteredCountries: Country[] = []; // Países filtrados por búsqueda
  searchTerm: string = ''; // Término de búsqueda del usuario
  loading: boolean = true; // Indica si está cargando datos
  currentLetter: string = ''; // Letra actual seleccionada en el alfabeto

  // Alfabeto completo para la navegación alfabética
  alphabet: string[] = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
  ];

  // Mapeo de nombres de regiones para mostrar en español
  regionDisplayNames: { [key: string]: string } = {
    'Americas': 'AMÉRICA',
    'Africa': 'ÁFRICA',
    'Antarctic': 'ANTÁRTIDA',
    'Asia': 'ASIA',
    'Europe': 'EUROPA',
    'Oceania': 'OCEANÍA'
  };

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
      this.regionName = params['region']; // Obtiene el nombre de la región
      console.log('🌍 Región seleccionada:', this.regionName);
      this.loadCountries();
    });
  }

  // Carga los países de la región desde la API
  loadCountries() {
    this.loading = true;
    
    console.log('📡 Cargando países de la API:', this.regionName);
    
    // Llama al servicio para obtener países por región
    this.countriesService.getCountriesByRegion(this.regionName).subscribe({
      next: (countries: Country[]) => {
        this.countries = countries;
        this.filteredCountries = countries; // Inicialmente muestra todos
        this.loading = false;
        
        console.log(`✅ ${countries.length} países cargados desde API`);
        if (countries.length > 0) {
          console.log('📋 Primer país:', countries[0]);
        }
      },
      error: (error: any) => {
        console.error('❌ Error cargando países:', error);
        this.loading = false;
      }
    });
  }

  // Filtra países según el término de búsqueda
  onSearch() {
    const term = this.searchTerm.toLowerCase().trim();
    
    if (term === '') {
      this.filteredCountries = this.countries; // Muestra todos si no hay búsqueda
    } else {
      // Filtra por nombre o capital
      this.filteredCountries = this.countries.filter(country =>
        country.name.toLowerCase().includes(term) ||
        country.capital.toLowerCase().includes(term)
      );
    }
    
    console.log(`🔍 ${this.filteredCountries.length} países encontrados`);
  }

  // Obtiene las letras que tienen países disponibles
  getAlphabetLetters(): string[] {
    const letters = new Set(
      this.filteredCountries.map(c => c.name.charAt(0).toUpperCase())
    );
    return Array.from(letters).sort();
  }

  // Obtiene países que empiezan con una letra específica
  getCountriesByLetter(letter: string): Country[] {
    return this.filteredCountries.filter(
      c => c.name.charAt(0).toUpperCase() === letter
    );
  }

  // Retorna el nombre de la región en español
  getRegionDisplayName(): string {
    return this.regionDisplayNames[this.regionName] || this.regionName;
  }

  // Hace scroll suave hasta la letra seleccionada
  scrollToLetter(letter: string) {
    this.currentLetter = letter;
    
    console.log(`📍 Intentando scroll a letra: ${letter}`);
    
    const hasCountries = this.getCountriesByLetter(letter).length > 0;
    
    if (!hasCountries) {
      console.warn(`⚠️ No hay países que empiecen con: ${letter}`);
      return;
    }
    
    // Busca el elemento HTML con la letra
    const separatorElement = document.querySelector(`[data-letter="${letter}"]`);
    
    if (separatorElement) {
      separatorElement.scrollIntoView({ 
        behavior: 'smooth', // Scroll animado
        block: 'start' // Posiciona al inicio de la pantalla
      });
      console.log(`✅ Scroll exitoso a letra: ${letter}`);
    } else {
      console.warn(`⚠️ No se encontró elemento para letra: ${letter}`);
    }
  }

  // Verifica si hay países que empiezan con una letra
  hasCountriesForLetter(letter: string): boolean {
    return this.getCountriesByLetter(letter).length > 0;
  }

  // Regresa a la página principal
  goBack() {
    this.router.navigate(['/home']);
  }

  // Navega al detalle de un país específico
  goToCountryDetail(countryCode: string) {
    console.log('📍 Navegando a país:', countryCode);
    this.router.navigate(['/countries', this.regionName, countryCode]);
  }

  // Formatea números con separadores de miles
  formatNumber(num: number): string {
    return this.countriesService.formatNumber(num);
  }

  // Maneja errores al cargar imágenes de banderas
  onImageError(event: any) {
    console.warn('⚠️ Error cargando bandera');
    event.target.src = 'https://via.placeholder.com/90x60/667eea/ffffff?text=Flag';
  }
}