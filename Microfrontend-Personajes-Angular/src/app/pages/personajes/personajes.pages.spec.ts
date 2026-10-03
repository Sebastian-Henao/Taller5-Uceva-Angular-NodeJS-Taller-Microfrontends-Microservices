import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonajesPages } from './personajes.pages';

describe('PersonajesPages', () => {
  let component: PersonajesPages;
  let fixture: ComponentFixture<PersonajesPages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonajesPages]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonajesPages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
