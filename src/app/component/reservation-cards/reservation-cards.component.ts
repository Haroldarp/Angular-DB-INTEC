import { Component, OnInit, Input } from '@angular/core';
import {DateService} from '../../services/date.service';
import {Reservation} from '../../models/reservation';
import {Store, select} from '@ngrx/store';
import {userState, selectAll} from '../../store/index';
import * as userActions from '../../store/user-state.actions';

@Component({
  selector: 'app-reservation-cards',
  templateUrl: './reservation-cards.component.html',
  styleUrls: ['./reservation-cards.component.css'],
  providers: [DateService]
})
export class ReservationCardsComponent implements OnInit {

  @Input() reservationInfo:Reservation;

  constructor(
    private _dateService:DateService,
    private store:Store<userState>
  ) { }

  ngOnInit(): void {
  }

  getDateString(index:number){
    return this._dateService.getDayString(index);
  }

  deleteReservation(event:any){
    var id = event.currentTarget.id;
    this.store.dispatch(userActions.deleteReservation({id}));
  }

}
