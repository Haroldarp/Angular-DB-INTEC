import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Reservation} from '../../models/reservation';
import {ReservationService} from '../../services/reservation.service';
import {Store, select} from '@ngrx/store';
import {userState, selectAll, getCurrentDeleteGroup, getCurrentDeleteReservation} from '../../store/index';
import * as userActions from '../../store/user-state.actions';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-my-reservation',
  templateUrl: './my-reservation.component.html',
  styleUrls: ['./my-reservation.component.css'],
  providers: [ReservationService]
})
export class MyReservationComponent implements OnInit {


  public myReservations:Array<any>;
  public myGroups:Array<any>;

  @ViewChild('verificationModal') verificationModal: ElementRef;
  verificationMessage:string;
  isUserReservation:boolean;

  currentDeleteReservation:string;
  currentDeleteGroup:string;

  // public prueba: Reservation[];

  constructor(
    private _modalService: NgbModal,
    private _reservationService: ReservationService,
    private store:Store<userState>

  ) { }

  ngOnInit(): void {

    this.store.dispatch(userActions.loadReservations());
    this.store.dispatch(userActions.loadGroups());

    this.store.pipe(select(selectAll)).subscribe(state =>{
      this.myReservations = this._reservationService.transformEntity( state.userReservation.entities);
      this.myGroups = this._reservationService.transformEntity( state.userGroupReservation.entities);

      // this.myReservations = this.groupByBuilding(this.myReservations,"building");
      // this.myGroups = this.groupByBuilding(this.myGroups,"building");
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

  showVerificationModal(isUserReservation){
    this.isUserReservation = isUserReservation;
    if(this.isUserReservation){
        this.verificationMessage = "Estas seguro que quieres descartar esta Reservacion"
      }else{
        this.verificationMessage = "Estas seguro que quieres salir de este grupo"
      }
    
    this._modalService.open(this.verificationModal, { centered: true });
  }

  deleteReservation(){
    this.store.pipe(select(getCurrentDeleteReservation)).subscribe(state =>{
      this.currentDeleteReservation = state;
    })

    this.store.dispatch(userActions.deleteReservation({id: this.currentDeleteReservation}));
    this._modalService.dismissAll();
  }

  deleteGroup(){
    this.store.pipe(select(getCurrentDeleteGroup)).subscribe(state =>{
      this.currentDeleteGroup = state;
    })

    this.store.dispatch(userActions.deleteGroup({id: this.currentDeleteGroup}));
    this._modalService.dismissAll();
  }


}
