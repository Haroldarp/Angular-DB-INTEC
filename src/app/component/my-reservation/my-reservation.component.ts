import { Component, OnInit } from '@angular/core';
import {Reservation} from '../../models/reservation';
import {ReservationService} from '../../services/reservation.service';
import {Store, select} from '@ngrx/store';
import {userState, selectAll} from '../../store/index';

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

    this.store.pipe(select(selectAll)).subscribe(state =>{
      this.myReservations = this._reservationService.transformEntity( state.userReservation.entities);
      this.myGroups = this._reservationService.transformEntity( state.userGroupReservation.entities);

      this.myReservations = this.groupByBuilding(this.myReservations,"building");
      this.myGroups = this.groupByBuilding(this.myGroups,"building");
    });

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
