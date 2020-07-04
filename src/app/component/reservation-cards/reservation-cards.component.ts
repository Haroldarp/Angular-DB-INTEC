import { Component, OnInit, Input } from '@angular/core';
import {ReservationInfo} from '../../models/reservation-info';

@Component({
  selector: 'app-reservation-cards',
  templateUrl: './reservation-cards.component.html',
  styleUrls: ['./reservation-cards.component.css']
})
export class ReservationCardsComponent implements OnInit {

  @Input() reservationInfo:ReservationInfo;

  constructor() { }

  ngOnInit(): void {
    console.log(this.reservationInfo); 
  }

}
