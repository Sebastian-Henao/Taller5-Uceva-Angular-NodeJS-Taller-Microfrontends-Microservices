import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonajesTableComponent } from './personajes-table.component';
import { By } from '@angular/platform-browser';
import { PERSONAJES_MOCK } from '../../mocks/personajes.mocks';

describe('PersonajesTableComponent', () => {
  let component: PersonajesTableComponent;
  let fixture: ComponentFixture<PersonajesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonajesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonajesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deberia renderizar una tabla', () => {
    const table = fixture.debugElement.query(By.css('table'));
    expect(table).toBeTruthy();
  });

  it('deberia renderizar una fila por personaje', () => {
    component.personajes = PERSONAJES_MOCK;
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(component.personajes.length);
  });

  it('deberia mostrar los datos del personaje en cada columna', () => {
    component.personajes = PERSONAJES_MOCK;
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));

    rows.forEach((row, index) => {
      const columns = row.queryAll(By.css('th, td'));
      const personaje = component.personajes[index];
      
      expect(columns[0].nativeElement.textContent.trim()).toBe(String(personaje.id));
      expect(columns[1].nativeElement.textContent.trim()).toBe(personaje.nombre);
      expect(columns[2].nativeElement.textContent.trim()).toBe(personaje.alias);
      expect(columns[3].nativeElement.textContent.trim()).toBe(personaje.juego);
      expect(columns[4].nativeElement.textContent.trim()).toBe(personaje.habilidad);
      expect(columns[5].nativeElement.textContent.trim()).toBe(personaje.rol);
    });
  });

  it('deberia mapear cada rol a su BadgeType correcto', () => {
    expect(component.categoryMap['Vanguardia']).toBe('primary');
    expect(component.categoryMap['Ladron']).toBe('dark');
    expect(component.categoryMap['Jefe']).toBe('danger');
    expect(component.categoryMap['Ilusionista']).toBe('info');
    expect(component.categoryMap['Explorador']).toBe('success');
  });
});
