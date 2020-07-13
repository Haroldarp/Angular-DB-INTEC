import { Component, OnInit, Input, ViewChild, ElementRef, EventEmitter, Output} from '@angular/core';
import {DateService} from '../../services/date.service';
import {Reservation} from '../../models/reservation';
import {Store, select} from '@ngrx/store';
import {userState, selectAll} from '../../store/index';
import * as userActions from '../../store/user-state.actions';
import { PeticionesService } from '../../services/peticiones.service';

@Component({
  selector: 'app-reservation-cards',
  templateUrl: './reservation-cards.component.html',
  styleUrls: ['./reservation-cards.component.css'],
  providers: [DateService, PeticionesService]
})
export class ReservationCardsComponent implements OnInit {

  @Input() reservationInfo:any;
  @Input() isUserReservation:boolean;

  public codigoCurso : any;

  @Output() verificationModal = new EventEmitter();

  verificationMessage:string;


  constructor(
    private _dateService:DateService,
    private _peticionesService: PeticionesService,
    private store:Store<userState>
  ) { }

  ngOnInit(): void {
    this.verificationMessage = "";
    this.getCodigoEdificio();
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

  getCodigoEdificio(){
    this._peticionesService.getCursoEdificio(this.reservationInfo.course).subscribe(
      result =>{
        this.codigoCurso = result[1];
      },
      error =>{
        console.log(error);
        this.codigoCurso = "Error";
      }
    )
  }

}
