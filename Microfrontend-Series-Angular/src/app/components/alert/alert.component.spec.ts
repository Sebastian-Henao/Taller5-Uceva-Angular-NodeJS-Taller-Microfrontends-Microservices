import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertComponent } from './alert.component';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
  });

  it('debe crearse correctamente', () => {
    component.alertState = 'loading';
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('debe asignar la clase primary para estado loading', () => {
    component.alertState = 'loading';
    fixture.detectChanges();
    expect(component.getClass()).toContain('alert-primary');
  });

  it('debe asignar la clase danger para estado error', () => {
    component.alertState = 'error';
    fixture.detectChanges();
    expect(component.getClass()).toContain('alert-danger');
  });

  it('debe renderizar el texto provisto', () => {
    component.alertState = 'loading';
    component.text = 'Cargando contenido';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Cargando contenido');
  });
});
