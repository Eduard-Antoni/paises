// Archivo de pruebas unitarias para CountriesService
import { TestBed } from '@angular/core/testing';

import { CountriesService } from './countries.service';

describe('CountriesService', () => {
  let service: CountriesService;

  // Configuración que se ejecuta antes de cada prueba
  beforeEach(() => {
    TestBed.configureTestingModule({}); // Configura el módulo de testing
    service = TestBed.inject(CountriesService); // Inyecta el servicio
  });

  // Prueba: Verifica que el servicio se crea correctamente
  it('should be created', () => {
    expect(service).toBeTruthy(); // Verifica que la instancia existe
  });
});