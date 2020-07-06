import { Component, OnInit } from '@angular/core';
import {Reservation} from '../../models/reservation';
import {ReservationService} from '../../services/reservation.service';
import {Store, select} from '@ngrx/store';
import {userState, selectAll} from '../../store/index';
import * as userActions from '../../store/user-state.actions';

@Component({
  selector: 'app-my-reservation',
  templateUrl: './my-reservation.component.html',
  styleUrls: ['./my-reservation.component.css'],
  providers: [ReservationService]
})
export class MyReservationComponent implements OnInit {

  public myReservations:Array<any>;
  public myGroups:Array<any>;
  public prueba: Reservation[];

  constructor(
    private _reservationService: ReservationService,
    private store:Store<userState>

  ) { }

  ngOnInit(): void {

    // this.prueba = [
    //   { building: 'FD', course:"FD312",week: 1,day: 2, date: "15-5-2020",iniTime: 7,endTime: 10},
    //   { building: 'FD', course: "FD315",week: 1,day: 2, date:"15-5-2020",iniTime: 11,endTime: 15},
    //   { building: 'HR', course: "FD315",week: 1,day: 2, date:"15-5-2020",iniTime: 11,endTime: 15},
    //   { building: 'HR', course: "FD315",week: 1 ,day: 2, date:"15-5-2020",iniTime: 11,endTime: 15},
    // ]

    this.store.pipe(select(selectAll)).subscribe(state =>{
      this.myReservations = this._reservationService.transformEntity( state.userReservation.entities);
      this.myGroups = this._reservationService.transformEntity( state.userGroupReservation.entities);
    });

    this.myReservations = this.groupByBuilding(this.myReservations,"building");
    this.myGroups = this.groupByBuilding(this.myGroups,"building");

    console.log(this.myReservations)
    


    // this.myReservations = [
    //   { 'code': 'FD', 
    //     'reservations': [new ReservationInfo("FD315","1","Martes", "15-5-2020",7,10),
    //     new ReservationInfo("FD315","1","Martes", "15-5-2020",11,15)]
    //   },

    //   { 'code': 'HR', 
    //     'reservations': [new ReservationInfo("FD315","1","Martes", "15-5-2020",7,10),
    //     new ReservationInfo("FD315","1","Martes", "15-5-2020",11,15)]
    //   }
    // ]

    // this.myGroups = [
    //   { 'code': 'FD', 
    //     'reservations': [new ReservationInfo("FD315","1","Martes", "15-5-2020",7,10),
    //     new ReservationInfo("FD315","1","Martes", "15-5-2020",11,15)]
    //   },

    //   { 'code': 'HR', 
    //     'reservations': [new ReservationInfo("FD315","1","Martes", "15-5-2020",7,10),
    //     new ReservationInfo("FD315","1","Martes", "15-5-2020",11,15)]
    //   }
    // ]
  }

  groupByBuilding(entity, property){
    let group = entity.reduce((entity, property) => {
      entity[property.building] = [...entity[property.building] || [], property];
      return entity;
     }, {});

     var prop = Object.getOwnPropertyNames(group);
     var grouped = [];
     prop.forEach(item =>{
      grouped.push( {code: item, reservations: group[item]});
     })

     return grouped;
  }

 

}
