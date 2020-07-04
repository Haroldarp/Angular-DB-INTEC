import { Component, OnInit } from '@angular/core';
import {ReservationInfo} from '../../models/reservation-info';


@Component({
  selector: 'app-my-reservation',
  templateUrl: './my-reservation.component.html',
  styleUrls: ['./my-reservation.component.css']
})
export class MyReservationComponent implements OnInit {

  public myReservations:Array<any>;
  public myGroups:Array<any>;

  constructor() { }

  ngOnInit(): void {
    this.myReservations = [
      { 'code': 'FD', 
        'reservations': [new ReservationInfo("FD315","1","Martes", "15-5-2020",7,10),
        new ReservationInfo("FD315","1","Martes", "15-5-2020",11,15)]
      },

      { 'code': 'HR', 
        'reservations': [new ReservationInfo("FD315","1","Martes", "15-5-2020",7,10),
        new ReservationInfo("FD315","1","Martes", "15-5-2020",11,15)]
      }
    ]

    this.myGroups = [
      { 'code': 'FD', 
        'reservations': [new ReservationInfo("FD315","1","Martes", "15-5-2020",7,10),
        new ReservationInfo("FD315","1","Martes", "15-5-2020",11,15)]
      },

      { 'code': 'HR', 
        'reservations': [new ReservationInfo("FD315","1","Martes", "15-5-2020",7,10),
        new ReservationInfo("FD315","1","Martes", "15-5-2020",11,15)]
      }
    ]
  }

}
