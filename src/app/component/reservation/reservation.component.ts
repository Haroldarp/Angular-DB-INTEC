import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Schedule} from '../../models/schedule';
import {Reservation} from '../../models/reservation';
import {ReservationService} from '../../services/reservation.service'
import * as $ from 'jquery';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
  providers: [ReservationService]
})
export class ReservationComponent implements OnInit {

  public course:string;

  public currentReservationCounter:number;
  public currentReservationDayIndex:number;

  public currentWeek:number;

  public hours:Array<number>;
  public schedule:Array<Schedule>;
  public reservations:Array<Reservation>;

  public modalErrorMessage:string;

  constructor(
    private _route: ActivatedRoute,
    private _reservationService: ReservationService
  ){
      window.scroll(0,0);
   }

  ngOnInit(): void {

    this._route.params.subscribe((params:Params)=>{
        this.course = params.course;
    });

    this.currentReservationCounter = 0;
    this.currentReservationDayIndex = null;

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
      new Reservation("Lunes",2,0),
      new Reservation("Martes",2,0),
      new Reservation("Miercoles",2,0),
      new Reservation("Jueves",2,0),
      new Reservation("Viernes",2,0),
      new Reservation("Sabado",2,0),
      new Reservation("Domingo",10,0),
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
      this.currentReservationDayIndex = this._reservationService.getDayIndex(div.id);
    }

    if(div.classList.contains('free')){

      var state = this._reservationService.addInterval(this.reservations,div.id,this.currentReservationDayIndex);

      if(state.ok){
        $(div).addClass('reserving').removeClass('free');
        this.currentReservationCounter++;

      }else{
        this.modalErrorMessage = state.errorMessage;
        // $("#WarningModal").modal('show');
      }

    }else if(div.classList.contains('reserving')){
      var state = this._reservationService.removeInterval(this.reservations,div.id,this.currentReservationDayIndex);

      if(state.removeCode == 0){
        $(div).addClass('free').removeClass('reserving');
        this.currentReservationCounter--;

      }else if(state.removeCode == 1){

        var day;

        for (let i = state.hour ; i <= 21; i++) {
          day = this.reservations[this.currentReservationDayIndex].day;
          $(`#${day}-${i}`).addClass('free').removeClass('reserving');
        }

      }
    
    }

    console.log(this.reservations);


  }

}
