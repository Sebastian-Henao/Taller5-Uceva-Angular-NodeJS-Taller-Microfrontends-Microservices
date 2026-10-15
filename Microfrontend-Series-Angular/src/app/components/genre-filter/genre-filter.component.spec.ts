import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GENRES_MOCK } from '../../mocks/series.mocks';
import { GenreFilterComponent } from './genre-filter.component';

describe('GenreFilterComponent', () => {
  let component: GenreFilterComponent;
  let fixture: ComponentFixture<GenreFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenreFilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GenreFilterComponent);
    component = fixture.componentInstance;
    component.genres = GENRES_MOCK as any;
    fixture.detectChanges();
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe emitir el género seleccionado cuando cambia', () => {
    jest.spyOn(component.genreChange, 'emit');

    component.selectGenre('Drama');
    expect(component.selectedGenre).toBe('Drama');
    expect(component.genreChange.emit).toHaveBeenCalledWith('Drama');
  });

  it('debe emitir null cuando se selecciona Todos', () => {
    component.selectedGenre = 'Drama';
    jest.spyOn(component.genreChange, 'emit');

    component.selectGenre(null);
    expect(component.selectedGenre).toBeNull();
    expect(component.genreChange.emit).toHaveBeenCalledWith(null);
  });

  it('no debe emitir si se selecciona el mismo género ya activo', () => {
    component.selectedGenre = 'Drama';
    jest.spyOn(component.genreChange, 'emit');

    component.selectGenre('Drama');
    expect(component.genreChange.emit).not.toHaveBeenCalled();
  });
});
