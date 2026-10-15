import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SERIES_MOCK } from '../../mocks/series.mocks';
import { SeriesCardComponent } from './series-card.component';

describe('SeriesCardComponent', () => {
  let component: SeriesCardComponent;
  let fixture: ComponentFixture<SeriesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeriesCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SeriesCardComponent);
    component = fixture.componentInstance;
    component.serie = SERIES_MOCK[0]!;
    fixture.detectChanges();
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe renderizar el título de la serie', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Stranger Things');
    expect(compiled.textContent).toContain('2016');
  });

  it('debe emitir selectSerie al invocar onCardClick', () => {
    jest.spyOn(component.selectSerie, 'emit');

    component.onCardClick();
    expect(component.selectSerie.emit).toHaveBeenCalledWith(SERIES_MOCK[0]);
  });

  it('debe emitir al hacer clic en el botón de ver detalle', () => {
    jest.spyOn(component.selectSerie, 'emit');
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    button.click();

    expect(component.selectSerie.emit).toHaveBeenCalledWith(SERIES_MOCK[0]);
  });
});
