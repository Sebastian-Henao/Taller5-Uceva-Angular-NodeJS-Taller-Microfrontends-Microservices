import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertComponent } from './alert.component';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.alertState = 'loading';
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('deberia tener el texto vacio por defecto', () => {
    component.alertState = 'loading';
    fixture.detectChanges();
    expect(component.text).toBe('');
  });

  it('deberia aplicar la clase correcta cuando el estado es "loading"', () => {
    component.alertState = 'loading';
    fixture.detectChanges();
    const cssClass = component.getClass();
    expect(cssClass).toContain('alert-primary');
  });

  it('deberia aplicar la clase correcta cuando el estado es "error"', () => {
    component.alertState = 'error';
    fixture.detectChanges();
    const cssClass = component.getClass();
    expect(cssClass).toContain('alert-danger');
  });

  it('deberia mapear correctamente los estados en alertClassMap', () => {
    const map = component.alertClassMap;
    expect(map['loading']).toBe('primary');
    expect(map['error']).toBe('danger');
  });

  it('deberia renderizar el texto recibido por input en loading', () => {
    component.alertState = 'loading';
    component.text = 'Cargando datos...';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Cargando datos...');
  });

  it('deberia renderizar el texto recibido por input en error', () => {
    component.alertState = 'error';
    component.text = 'Error al cargar los datos';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Error al cargar los datos');
  });

  it('no deberia lanzar errores al llamar getClass con un estado valido', () => {
    component.alertState = 'loading';
    expect(() => component.getClass()).not.toThrow();
  });
});
