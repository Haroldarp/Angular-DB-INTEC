import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationCardsComponent } from './reservation-cards.component';

describe('ReservationCardsComponent', () => {
  let component: ReservationCardsComponent;
  let fixture: ComponentFixture<ReservationCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
