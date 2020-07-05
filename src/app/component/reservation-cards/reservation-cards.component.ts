import { Component, OnInit, Input } from '@angular/core';
import {Reservation} from '../../models/reservation';

@Component({
  selector: 'app-reservation-cards',
  templateUrl: './reservation-cards.component.html',
  styleUrls: ['./reservation-cards.component.css']
})
export class ReservationCardsComponent implements OnInit {

  @Input() reservationInfo:Reservation;

  constructor() { }

  ngOnInit(): void {
    console.log(this.reservationInfo); 
  }

}
