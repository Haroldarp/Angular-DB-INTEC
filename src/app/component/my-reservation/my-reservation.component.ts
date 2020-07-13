import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Reservation} from '../../models/reservation';
import {ReservationService} from '../../services/reservation.service';
import {PeticionesService} from '../../services/peticiones.service';
import {StoreService} from '../../services/Strore.service';
import {Store, select} from '@ngrx/store';
import {userState, selectAll, getCurrentDeleteGroup, getCurrentDeleteReservation, selectUserId} from '../../store/index';
import * as userActions from '../../store/user-state.actions';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-my-reservation',
  templateUrl: './my-reservation.component.html',
  styleUrls: ['./my-reservation.component.css'],
  providers: [ReservationService, PeticionesService, StoreService]
})
export class MyReservationComponent implements OnInit {


  public userId: number | string; 
  public myReservations:Array<any>;
  public myGroups:Array<any>;

  @ViewChild('verificationModal') verificationModal: ElementRef;
  verificationMessage:string;
  isUserReservation:boolean;

  currentDeleteReservation:string;
  currentDeleteGroup:string;

  constructor(
    private _modalService: NgbModal,
    private _reservationService: ReservationService,
    private _peticionesService: PeticionesService,
    private _storeService: StoreService,
    private store:Store<userState>

  ) { }

  ngOnInit(): void {

    this.userId = 0;
    this.store.pipe(select(selectUserId)).subscribe( state =>{
      this.userId = state[0];
    });

    if(this.userId == undefined){
      this.userId = Number.parseInt(localStorage.getItem('id'));
    }
    
    this.myReservations = [];
    this.myGroups = [];

    this.loadReservations();
    this.loadGroups();
    
    this.store.pipe(select(selectAll)).subscribe(state =>{
      this.myReservations = this._reservationService.transformEntity( state.userReservation.entities);
      this.myGroups = this._reservationService.transformEntity( state.userGroupReservation.entities);

    });

    

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

    this._peticionesService.eliminarReserva(this.currentDeleteReservation).subscribe(result => {

      if(result.Ok){
        this.store.dispatch(userActions.deleteReservationSuccess({id: this.currentDeleteReservation}));

      }else{
        this.store.dispatch(userActions.deleteReservationFailure({error: result}));
      }
    },

    error =>{
      console.log(error);
      this.store.dispatch(userActions.deleteReservationFailure({error: error}));
    });

    this._modalService.dismissAll();
  }


  deleteGroup(){
    this.store.pipe(select(getCurrentDeleteGroup)).subscribe(state =>{
      this.currentDeleteGroup = state;
    })

    this._peticionesService.salirGrupo(this.currentDeleteGroup).subscribe(
      result => {

        if(result.Ok){
          this.store.dispatch(userActions.deleteGroupSuccess({id: this.currentDeleteGroup}));

        }else{
          this.store.dispatch(userActions.deleteGroupFailure({error: result}));
        }

      },

      error =>{
        console.log(error);
        this.store.dispatch(userActions.deleteGroupFailure({error: error}));

      });

    this._modalService.dismissAll();
  }

  loadReservations(){
    this._peticionesService.getReservas(this.userId).subscribe(
      result =>{
        console.log(result);

        if(result[0].Ok){

          result[1].forEach(element => {

            this.myReservations.push({id: element.idReserva, course: element.idCurso,
              date: element.FechaReserva.split("T")[0], iniTime: element.idHoraIn, 
              endTime: element.idHoraF , week: element.idSemana, day: element.idDias- 1 });

          });

          this.store.dispatch(userActions.loadReservationsSuccess({Reservations: this.myReservations}));

          console.log(this.myReservations);

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
    this._peticionesService.getReservaGrupo(this.userId).subscribe(
      result =>{
        if(result[0].Ok){

          result[1].forEach(element => {
            
            this.myGroups.push({id:  element.idGrupoReserva, idReservation: element.idReserva , 
              course: element.idCurso,
              date: element.FechaReserva.split("T")[0], iniTime: element.idHoraIn, 
              endTime: element.idHoraF , week: element.idSemana, day: element.idDias- 1 });

            });

          this.store.dispatch(userActions.loadGroupsSuccess({Groups: this.myGroups}));

        }else{
          this.store.dispatch(userActions.loadGroupsFailure({error: result}));

        }
      },
      error =>{
        this.store.dispatch(userActions.loadGroupsFailure({error: error}));

      }
    );
  }


  // groupByBuilding(entity, property){
  //   let group = entity.reduce((entity, property) => {
  //     entity[property.building] = [...entity[property.building] || [], property];
  //     return entity;
  //    }, {});

  //    var prop = Object.getOwnPropertyNames(group);
  //    var grouped = [];
  //    prop.forEach(item =>{
  //     grouped.push( {code: item, reservations: group[item]});
  //    })

  //    return grouped;
  // }


}
