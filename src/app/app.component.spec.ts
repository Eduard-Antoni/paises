// Archivo de pruebas unitarias para AppComponent
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  // Configuración que se ejecuta antes de cada prueba
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent], // Importa el componente standalone
    }).compileComponents();
  });

  // Prueba 1: Verifica que el componente se crea correctamente
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy(); // Verifica que la instancia existe
  });

  // Prueba 2: Verifica que el título sea 'paises'
  it(`should have the 'paises' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('paises'); // Verifica el valor de la propiedad title
  });

  // Prueba 3: Verifica que se renderiza el título en el HTML
  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges(); // Ejecuta la detección de cambios
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, paises'); // Busca el h1 en el DOM
  });
});