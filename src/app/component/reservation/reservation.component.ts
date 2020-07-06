import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Schedule} from '../../models/schedule';
import {Reservation} from '../../models/reservation';
import {ReservationService} from '../../services/reservation.service';
import {DateService} from '../../services/date.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Store, select} from '@ngrx/store';
import {userState, selectAll} from '../../store/index';
import * as userActions from '../../store/user-state.actions';
import * as $ from 'jquery';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
  providers: [ReservationService, DateService]
})
export class ReservationComponent implements OnInit {

  @ViewChild('errorModal') errorModal: ElementRef;

  public currentReservation: Reservation;

  public hours:Array<number>;
  public schedule:Array<Schedule>;

  public reservations:Reservation[];
  public reservationGroups:Reservation[];

  public modalErrorMessage:string;


  constructor(
    private _route: ActivatedRoute,
    private _reservationService: ReservationService,
    private _dateService: DateService,
    private _modalService: NgbModal,
    private store:Store<userState>

  ){
      window.scroll(0,0);
   }

  ngOnInit(): void {

    this.currentReservation = {course: null,
      iniTime: null, endTime: null, 
      week:1, day:null, date: null, 
      group: [], limit: 2, counterHours: 0}

    this._route.params.subscribe((params:Params)=>{
      this.currentReservation.course = params.course;
    });


    this.store.dispatch(userActions.loadUser());
    this.store.dispatch(userActions.loadReservations());
    this.store.dispatch(userActions.loadGroups());

    this.store.pipe(select(selectAll)).subscribe(state =>{
      this.reservations = this._reservationService.transformEntity(state.userReservation.entities);
      this.reservationGroups = this._reservationService.transformEntity(state.userGroupReservation.entities);
    });
    
    console.log(this.reservations);
    console.log(this.reservationGroups);


    this.hours = [7,8,9,10,11,12,13,14,15,16,17,18,19,20,21];

    this.schedule = [
      new Schedule("Lunes",[0,0,1,1,1,1,2,2,2,1,1,1,1,0,0]),
      new Schedule("Martes",[1,1,1,1,1,1,0,0,0,2,2,1,1,1,1]),
      new Schedule("Miercoles",[2,2,0,0,0,0,2,1,1,1,1,1,1,1,1]),
      new Schedule("Jueves",[1,1,2,2,2,2,0,0,0,0,0,0,1,1,1]),
      new Schedule("Viernes",[0,0,1,1,1,1,2,2,2,1,1,1,1,0,0]),
      new Schedule("Sabado",[1,1,1,1,1,1,0,0,0,2,2,1,1,1,1]),
      new Schedule("Domingo",[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),
    ]

  }

  onArrowClick(event:any){
    if(event.currentTarget.id == 'left' && this.currentReservation.week > 1){
      this.currentReservation.week--;

    }else if(event.currentTarget.id == 'right' && this.currentReservation.week < 12){
      this.currentReservation.week++;

    }
  }

  onFreeClick(event:any){
    var div = event.currentTarget;

    if(this.currentReservation.counterHours == 0){
      this.currentReservation.date = div.id.split("/")[0];
    }

    if(div.classList.contains('free')){

      var state = this._reservationService.addInterval(this.reservations,this.reservationGroups , this.currentReservation,div.id,);

      if(state.ok){
        $(div).addClass('reserving').removeClass('free');

      }else{
        console.log(state.errorMessage);
        this.showErrorModal(this.errorModal,state.errorMessage);
      }

    }else if(div.classList.contains('reserving')){

      var state = this._reservationService.removeInterval(this.currentReservation,div.id);

      if(state.removeCode == 0){
        $(div).addClass('free').removeClass('reserving');

      }else if(state.removeCode == 1){

        for (let i = state.hour ; i <= 21; i++) {
          var divs = document.getElementById(`${this.currentReservation.date}/${i}`);
          $(divs).addClass('free').removeClass('reserving');
        }

      }
    
    }

      console.log(this.currentReservation);

  }

  showErrorModal(modal, errorMessage){
    this.modalErrorMessage = errorMessage;
    this._modalService.open(modal, { centered: true });
  }

  getDate(day:number, week:number){
    return this._dateService.getDateAddDays(day, week);
  }

}
