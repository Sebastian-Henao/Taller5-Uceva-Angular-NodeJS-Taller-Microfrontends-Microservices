import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SERIES_MOCK } from '../../mocks/series.mocks';
import { SeriesDetailComponent } from './series-detail.component';

describe('SeriesDetailComponent', () => {
  let component: SeriesDetailComponent;
  let fixture: ComponentFixture<SeriesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeriesDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SeriesDetailComponent);
    component = fixture.componentInstance;
    component.serie = SERIES_MOCK[0]!;
    fixture.detectChanges();
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe mostrar los datos completos de la serie', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Stranger Things');
    expect(compiled.textContent).toContain('Millie Bobby Brown');
    expect(compiled.textContent).toContain('Ciencia ficción');
  });

  it('debe emitir close al invocar onClose', () => {
    jest.spyOn(component.close, 'emit');

    component.onClose();
    expect(component.close.emit).toHaveBeenCalled();
  });
});
