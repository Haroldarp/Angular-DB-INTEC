import { Component, OnInit, Input, ViewChild, ElementRef, EventEmitter, Output} from '@angular/core';
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
  @Input() isUserReservation:boolean;

  @Output() verificationModal = new EventEmitter();

  verificationMessage:string;


  constructor(
    private _dateService:DateService,
    private store:Store<userState>
  ) { }

  ngOnInit(): void {
    this.verificationMessage = "";
  }

  getDateString(index:number){
    return this._dateService.getDayString(index);
  }

  deleteReservation(event:any){
    var id = event.currentTarget.id;
    this.store.dispatch(userActions.setCurrentDeleteReservation({id}));
    this.verificationModal.emit(this.isUserReservation);
  }

  deleteGroup(event:any){
    var id = event.currentTarget.id;
    this.store.dispatch(userActions.setCurrentDeleteGroup({id}));
    this.verificationModal.emit(this.isUserReservation);
  }

  // showVerification( userReservation ){
  //   if(userReservation){
  //     this.verificationMessage = "Estas seguro que quieres descartar esta Reservacion?"
  //   }else{
  //     this.verificationMessage = "Estas seguro que quieres salir de este grupo?"
  //   }

  //   this._modalService.open(modal, { centered: true });
  // }

  // showErrorModal(modal, errorMessage){
  //   this.modalErrorMessage = errorMessage;
  //   this._modalService.open(modal, { centered: true });
  // }

}
