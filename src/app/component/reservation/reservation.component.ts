import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Schedule} from '../../models/schedule';
import {Reservation} from '../../models/reservation';
import {ReservationService} from '../../services/reservation.service';
import {PeticionesService} from '../../services/peticiones.service';
import {DateService} from '../../services/date.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Store, select} from '@ngrx/store';
import {userState, selectAll, selectUserId} from '../../store/index';
import * as userActions from '../../store/user-state.actions';
import * as $ from 'jquery';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
  providers: [ReservationService, DateService, PeticionesService]
})
export class ReservationComponent implements OnInit {

  @ViewChild('errorModal') errorModal: ElementRef;
  @ViewChild('sendReservationModal') sendReservationModal: ElementRef;

  matricula:string;
  minPeople:number;
  public userId: number | string; 


  public currentReservation: Reservation;

  public hours:Array<number>;
  public schedule:Array<Schedule>;

  public reservations:Reservation[];
  public reservationGroups:Reservation[];

  public modalErrorMessage:string;
  public noExiste;

  constructor(
    private _route: ActivatedRoute,
    private _reservationService: ReservationService,
    private _dateService: DateService,
    private _modalService: NgbModal,
    private _peticionesSevice: PeticionesService,
    private store:Store<userState>

  ){
      window.scroll(0,0);
   }

  ngOnInit(): void {

    this.matricula ="";
    this.noExiste = false;

    this.userId = 0;
    this.store.pipe(select(selectUserId)).subscribe( state =>{
      this.userId = state[0];
    });

    if(this.userId == undefined){
      this.userId = Number.parseInt(localStorage.getItem('id'));
    }


    this.reservations = [];
    this.reservationGroups = [];

    this.loadReservations();
    this.loadGroups();

    this.store.pipe(select(selectAll)).subscribe(state =>{
      this.reservations = this._reservationService.transformEntity(state.userReservation.entities);
      this.reservationGroups = this._reservationService.transformEntity(state.userGroupReservation.entities);
    });

    this.currentReservation = {course: null, idCourse : null,
      iniTime: null, endTime: null, 
      week:1, day:null, date: null, 
      group: [], counterHours: 0 , idReservante: this.userId}

    this._route.params.subscribe((params:Params)=>{
      this.currentReservation.course = params.courseName;
      this.currentReservation.idCourse = params.idCourse;
    });

    this.currentReservation.week = this._dateService.getCurrentWeek();

    

    this.minPeople = 3;
    
    console.log(this.reservations);
    console.log(this.reservationGroups);


    this.hours = [7,8,9,10,11,12,13,14,15,16,17,18,19,20,21];
    this.loadSchedule();

  }


  onArrowClick(event:any){
    if(event.currentTarget.id == 'left' && this.currentReservation.week > 1){
      this.currentReservation.week--;
      this.loadSchedule();


    }else if(event.currentTarget.id == 'right' && this.currentReservation.week < 12){
      this.currentReservation.week++;
      this.loadSchedule();


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
        //cualquier vaina coge to lo div y quitale el reserving class

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

  agregarMatricula(){
    // this._peticionesSevice.verifyUserExists(this.matricula).subscribe(
    //   result =>{
    //     if(result.Ok){
          this.currentReservation.group.push(this.matricula);
          this.matricula = '';
    //       this.noExiste = false;

    //     }else{
    //       this.noExiste = true;
    //     }

    //   },
    //   error =>{
    //     console.log(error);
    //   }
    // )

  }

  showErrorModal(modal, errorMessage){
    this.modalErrorMessage = errorMessage;
    this._modalService.open(modal, { centered: true });
  }

  showSendReservationModal(){
    this._modalService.open(this.sendReservationModal, { centered: true })
  }

  sendReservation(){
    this.currentReservation.day = this._reservationService.getDayIndex(this.currentReservation.date) + 1;
    this._peticionesSevice.addReserva(this.currentReservation).subscribe(
      result => {
        if(result.Ok){
          this._modalService.dismissAll();
          this.showErrorModal(this.errorModal, "La reserva se guardo con exito!!!!!");
          this.loadSchedule();
        }
      },
      error =>{
        console.log(error);
      }
    );


  }

  getDate(day:number, week:number){
    return this._dateService.getDateAddDays(day, week);
  }

  datePassed(date:string, hour:number){
    return this._dateService.datePassed(date, hour);
  }


  loadSchedule(){
    this._peticionesSevice.getHorario(this.currentReservation.idCourse,this.currentReservation.week).subscribe(
      result =>{
        if(result[0].Ok){
          this.schedule = [
            new Schedule("Lunes",result[1][0]),
            new Schedule("Martes",result[1][1]),
            new Schedule("Miercoles",result[1][2]),
            new Schedule("Jueves",result[1][3]),
            new Schedule("Viernes",result[1][4]),
            new Schedule("Sabado",result[1][5]),
            new Schedule("Domingo",result[1][6]),
          ]
        }
      },
      error =>{
        console.log(error);
      }
    )
  }

  loadReservations(){
    this._peticionesSevice.getReservas(this.userId).subscribe(
      result =>{
        console.log(result);

        if(result[0].Ok){

          result[1].forEach(element => {

            this.reservations.push({id: element.idReserva, course: element.idCurso,
              date: element.FechaReserva.split("T")[0], iniTime: element.idHoraIn, 
              endTime: element.idHoraF , week: element.idSemana, day: element.idDias- 1 });
          });

          this.store.dispatch(userActions.loadReservationsSuccess({Reservations: this.reservations}));

          console.log(this.reservations);

        }else{
          this.store.dispatch(userActions.loadReservationsFailure({error: result}));

        }

      },
      error =>{
        this.store.dispatch(userActions.loadReservationsFailure({error: error}));
      }
    );
  }

  loadGroups(){
    this._peticionesSevice.getReservaGrupo(this.userId).subscribe(
      result =>{
        if(result[0].Ok){

          result[1].forEach(element => {
            
            this.reservationGroups.push({id:  element.idGrupoReserva, idReservation: element.idReserva , 
              course: element.idCurso,
              date: element.FechaReserva.split("T")[0], iniTime: element.idHoraIn, 
              endTime: element.idHoraF , week: element.idSemana, day: element.idDias- 1 });
            });

          this.store.dispatch(userActions.loadGroupsSuccess({Groups: this.reservationGroups}));

        }else{
          this.store.dispatch(userActions.loadGroupsFailure({error: result}));

        }

      },
      error =>{
        this.store.dispatch(userActions.loadGroupsFailure({error: error}));

      }
    );
  }

}
