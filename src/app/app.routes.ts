// Configuración de rutas de la aplicación
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CountriesListComponent } from './pages/countries-list/countries-list.component';
import { CountryDetailComponent } from './pages/country-detail/country-detail.component';

export const routes: Routes = [
  // Ruta raíz: redirige a home
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  
  // Ruta de página principal
  {
    path: 'home',
    component: HomeComponent
  },
  
  // Ruta de detalle de país (2 parámetros: region y code)
  // DEBE ir antes que la ruta con 1 parámetro para evitar conflictos
  {
    path: 'countries/:region/:code',
    component: CountryDetailComponent
  },
  
  // Ruta de lista de países por región (1 parámetro: region)
  {
    path: 'countries/:region',
    component: CountriesListComponent
  }
];