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

  public counter:number;
  public weekReservationIndex:number;

  public weekCounter:number;
  public reservations:Array<Reservation>;
  public schedule:Array<Schedule>;
  public days:Array<string>;
  public hours:Array<number>;
  public course:string;


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

    this.counter = 0;
    this.weekReservationIndex = null;
    this.weekCounter = 1;
    

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
      new Reservation("Domingo",2,0),
    ]

  }

  onArrowClick(event:any){
    if(event.currentTarget.id == 'left' && this.weekCounter > 1){
      this.weekCounter--;

    }else if(event.currentTarget.id == 'right' && this.weekCounter < 12){
      this.weekCounter++;

    }
  }

  onFreeClick(event:any){
    var div = event.currentTarget;

    if(this.counter == 0){
      this.weekReservationIndex = this._reservationService.getIndex(div.id);
    }

    if(div.classList.contains('free')){
      console.log(this._reservationService.verify(this.reservations,div.id,this.weekReservationIndex));
      $(div).addClass('reserving').removeClass('free');
      this.counter++;

    }else if(div.classList.contains('reserving')){
      $(div).addClass('free').removeClass('reserving');
      this.counter--;
    
    }

  }

}
