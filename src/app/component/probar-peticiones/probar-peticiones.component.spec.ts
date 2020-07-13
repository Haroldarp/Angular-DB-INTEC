import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProbarPeticionesComponent } from './probar-peticiones.component';

describe('ProbarPeticionesComponent', () => {
  let component: ProbarPeticionesComponent;
  let fixture: ComponentFixture<ProbarPeticionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProbarPeticionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProbarPeticionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
