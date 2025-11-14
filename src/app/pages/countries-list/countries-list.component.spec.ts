// Archivo de pruebas unitarias para CountriesListComponent
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesListComponent } from './countries-list.component';

describe('CountriesListComponent', () => {
  let component: CountriesListComponent;
  let fixture: ComponentFixture<CountriesListComponent>;

  // Configuración que se ejecuta antes de cada prueba
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountriesListComponent] // Importa el componente standalone
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Ejecuta la detección de cambios
  });

  // Prueba: Verifica que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});