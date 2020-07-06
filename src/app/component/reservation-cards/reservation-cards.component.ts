import { Component, OnInit, Input } from '@angular/core';
import {DateService} from '../../services/date.service';
import {Reservation} from '../../models/reservation';

@Component({
  selector: 'app-reservation-cards',
  templateUrl: './reservation-cards.component.html',
  styleUrls: ['./reservation-cards.component.css'],
  providers: [DateService]
})
export class ReservationCardsComponent implements OnInit {

  @Input() reservationInfo:Reservation;

  constructor(
    private _dateService:DateService
  ) { }

  ngOnInit(): void {
    console.log(this.reservationInfo); 
  }

  getDateString(index:number){
    return this._dateService.getDayString(index);
  }

}
