// Servicio para manejar peticiones HTTP a la API de países
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';

// Interfaz que define la estructura de un país
export interface Country {
  code: string;
  name: string;
  capital: string;
  population: number;
  region: string;
  flagUrl: string;
  area: number;
  languages: string;
  currency: string;
  timezone: string;
}

// Injectable permite que este servicio sea inyectado en componentes
@Injectable({
  providedIn: 'root' // Disponible en toda la aplicación
})
export class CountriesService {
  
  // URL base de la API de países
  private apiUrl = 'https://restcountries.com/v3.1';

  // Inyecta HttpClient para hacer peticiones HTTP
  constructor(private http: HttpClient) { }

  // Obtiene lista de países filtrados por región
  getCountriesByRegion(region: string): Observable<Country[]> {
    console.log('🔍 Buscando países en región:', region);
    
    return this.http.get<any[]>(`${this.apiUrl}/region/${region}`).pipe(
      map(countries => {
        // Transforma y ordena los países alfabéticamente
        const mapped = countries
          .map(country => this.mapCountry(country))
          .sort((a, b) => a.name.localeCompare(b.name));
        
        console.log('✅ Países encontrados:', mapped.length);
        return mapped;
      }),
      catchError(error => {
        // Maneja errores y retorna array vacío
        console.error('❌ Error obteniendo países:', error);
        return of([]);
      })
    );
  }

  // Obtiene un país específico por su código (ej: MX, US, BR)
  getCountryByCode(code: string): Observable<Country | null> {
    console.log('🔍 Buscando país con código:', code);
    
    return this.http.get<any[]>(`${this.apiUrl}/alpha/${code}`).pipe(
      map(countries => {
        if (countries && countries.length > 0) {
          const country = this.mapCountry(countries[0]);
          console.log('✅ País encontrado:', country);
          return country;
        }
        console.error('❌ País no encontrado');
        return null;
      }),
      catchError(error => {
        // Maneja errores y retorna null
        console.error('❌ Error obteniendo país:', error);
        return of(null);
      })
    );
  }

  // Transforma los datos de la API al formato de nuestra interfaz Country
  private mapCountry(apiCountry: any): Country {
    // Obtiene el nombre en español si está disponible
    const name = apiCountry.translations?.spa?.common || apiCountry.name.common;

    // Obtiene la capital (primera si hay múltiples)
    const capital = apiCountry.capital && apiCountry.capital.length > 0
      ? apiCountry.capital[0]
      : 'No disponible';

    // Convierte el objeto de idiomas a string separado por comas
    const languages = apiCountry.languages 
      ? Object.values(apiCountry.languages).join(', ')
      : 'No disponible';

    // Obtiene información de la moneda
    let currency = 'No disponible';
    if (apiCountry.currencies) {
      const currencyData = Object.values(apiCountry.currencies)[0] as any;
      currency = `${currencyData.name} (${currencyData.symbol || ''})`;
    }

    // Obtiene las zonas horarias
    const timezone = apiCountry.timezones && apiCountry.timezones.length > 0
      ? apiCountry.timezones.join(', ')
      : 'No disponible';

    // Obtiene el código de país (ISO 3166-1 alpha-2)
    const code = apiCountry.cca2 || apiCountry.cioc || 'XX';

    return {
      code: code,
      name: name,
      capital: capital,
      population: apiCountry.population || 0,
      region: apiCountry.region || 'Unknown',
      flagUrl: apiCountry.flags?.png || apiCountry.flags?.svg || '',
      area: apiCountry.area || 0,
      languages: languages,
      currency: currency,
      timezone: timezone
    };
  }

  // Formatea números con separadores de miles (ej: 1000000 -> 1.000.000)
  formatNumber(num: number): string {
    return new Intl.NumberFormat('es-ES').format(num);
  }

  // Retorna lista de regiones disponibles
  getRegions(): string[] {
    return ['Americas', 'Africa', 'Asia', 'Europe', 'Oceania'];
  }
}