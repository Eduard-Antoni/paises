import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  regionName: string = '';
  countries: Country[] = [];
  filteredCountries: Country[] = [];
  searchTerm: string = '';
  loading: boolean = true;
  currentLetter: string = '';

  // Alfabeto completo
  alphabet: string[] = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
  ];

  // Nombres de regiones
  regionDisplayNames: { [key: string]: string } = {
    'Americas': 'AMÉRICA',
    'Africa': 'ÁFRICA',
    'Antarctic': 'ANTÁRTIDA',
    'Asia': 'ASIA',
    'Europe': 'EUROPA',
    'Oceania': 'OCEANÍA'
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private countriesService: CountriesService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.regionName = params['region'];
      console.log('🌍 Región seleccionada:', this.regionName);
      this.loadCountries();
    });
  }

  loadCountries() {
    this.loading = true;
    
    console.log('📡 Cargando países de la API:', this.regionName);
    
    // 🔥 Usar getCountriesByRegion con tipado correcto
    this.countriesService.getCountriesByRegion(this.regionName).subscribe({
      next: (countries: Country[]) => {
        this.countries = countries;
        this.filteredCountries = countries;
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

  onSearch() {
    const term = this.searchTerm.toLowerCase().trim();
    
    if (term === '') {
      this.filteredCountries = this.countries;
    } else {
      this.filteredCountries = this.countries.filter(country =>
        country.name.toLowerCase().includes(term) ||
        country.capital.toLowerCase().includes(term)
      );
    }
    
    console.log(`🔍 ${this.filteredCountries.length} países encontrados`);
  }

  getAlphabetLetters(): string[] {
    const letters = new Set(
      this.filteredCountries.map(c => c.name.charAt(0).toUpperCase())
    );
    return Array.from(letters).sort();
  }

  getCountriesByLetter(letter: string): Country[] {
    return this.filteredCountries.filter(
      c => c.name.charAt(0).toUpperCase() === letter
    );
  }

  getRegionDisplayName(): string {
    return this.regionDisplayNames[this.regionName] || this.regionName;
  }

  scrollToLetter(letter: string) {
    this.currentLetter = letter;
    
    console.log(`📍 Intentando scroll a letra: ${letter}`);
    
    const hasCountries = this.getCountriesByLetter(letter).length > 0;
    
    if (!hasCountries) {
      console.warn(`⚠️ No hay países que empiecen con: ${letter}`);
      return;
    }
    
    const separatorElement = document.querySelector(`[data-letter="${letter}"]`);
    
    if (separatorElement) {
      separatorElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
      console.log(`✅ Scroll exitoso a letra: ${letter}`);
    } else {
      console.warn(`⚠️ No se encontró elemento para letra: ${letter}`);
    }
  }

  hasCountriesForLetter(letter: string): boolean {
    return this.getCountriesByLetter(letter).length > 0;
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  goToCountryDetail(countryCode: string) {
    console.log('📍 Navegando a país:', countryCode);
    this.router.navigate(['/countries', this.regionName, countryCode]);
  }

  formatNumber(num: number): string {
    return this.countriesService.formatNumber(num);
  }

  onImageError(event: any) {
    console.warn('⚠️ Error cargando bandera');
    event.target.src = 'https://via.placeholder.com/90x60/667eea/ffffff?text=Flag';
  }
}