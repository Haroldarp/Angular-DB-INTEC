import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Schedule} from '../../models/schedule';
import {Reservation} from '../../models/reservation';
import {ReservationService} from '../../services/reservation.service';
import {DateService} from '../../services/date.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
  providers: [ReservationService, DateService]
})
export class ReservationComponent implements OnInit {

  @ViewChild('errorModal') errorModal: ElementRef;

  public course:string;

  public currentReservationCounter:number;
  public currentReservationDay:string;

  public currentWeek:number;

  public hours:Array<number>;
  public schedule:Array<Schedule>;

  public reservations:Array<Reservation>;

  public modalErrorMessage:string;

  constructor(
    private _route: ActivatedRoute,
    private _reservationService: ReservationService,
    private _dateService: DateService,
    private _modalService: NgbModal
  ){
      window.scroll(0,0);
   }

  ngOnInit(): void {

    this._route.params.subscribe((params:Params)=>{
        this.course = params.course;
    });

    this.currentReservationCounter = 0;
    this.currentReservationDay = null;

    this.currentWeek = 1;
    

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

    this.reservations = [
      {day:"Lunes",limit: 2,counterHours: 0, iniTime: null, endTime: null},
      {day:"Martes",limit: 2,counterHours: 0, iniTime: null, endTime: null},
      {day:"Miercoles",limit: 2,counterHours: 0, iniTime: null, endTime: null},
      {day:"Jueves",limit: 2,counterHours: 0, iniTime: null, endTime: null},
      {day:"Viernes",limit: 2,counterHours: 0, iniTime: null, endTime: null},
      {day:"Sabado",limit: 2,counterHours: 0, iniTime: null, endTime: null},
      {day:"Domingo",limit: 2,counterHours: 0, iniTime: null, endTime: null},
    ]

  }

  onArrowClick(event:any){
    if(event.currentTarget.id == 'left' && this.currentWeek > 1){
      this.currentWeek--;

    }else if(event.currentTarget.id == 'right' && this.currentWeek < 12){
      this.currentWeek++;

    }
  }

  onFreeClick(event:any){
    var div = event.currentTarget;

    if(this.currentReservationCounter == 0){
      this.currentReservationDay = div.id.split("-")[0];
    }

    if(div.classList.contains('free')){

      var state = this._reservationService.addInterval(this.reservations,div.id,this.currentReservationDay);

      if(state.ok){
        $(div).addClass('reserving').removeClass('free');
        this.currentReservationCounter++;

      }else{
        console.log(state.errorMessage);
        this.showErrorModal(this.errorModal,state.errorMessage);
      }

    }else if(div.classList.contains('reserving')){
      var state = this._reservationService.removeInterval(this.reservations,div.id,this.currentReservationDay);

      if(state.removeCode == 0){
        $(div).addClass('free').removeClass('reserving');
        this.currentReservationCounter--;

      }else if(state.removeCode == 1){

        var day;

        for (let i = state.hour ; i <= 21; i++) {
          day = this.reservations[this._reservationService.getDayIndex(this.currentReservationDay)].day;
          $(`#${day}-${i}`).addClass('free').removeClass('reserving');
        }

      }
    
    }

    console.log(this.reservations);

  }

  showErrorModal(modal, errorMessage){
    this.modalErrorMessage = errorMessage;
    this._modalService.open(modal, { centered: true });
  }

  getDate(day:number, week:number){
    return this._dateService.getDateAddDays(day, week);
  }

}
