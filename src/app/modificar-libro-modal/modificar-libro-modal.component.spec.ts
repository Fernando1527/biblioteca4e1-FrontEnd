import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarLibroModalComponent } from './modificar-libro-modal.component';

describe('ModificarLibroModalComponent', () => {
  let component: ModificarLibroModalComponent;
  let fixture: ComponentFixture<ModificarLibroModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarLibroModalComponent]
    });
    fixture = TestBed.createComponent(ModificarLibroModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
