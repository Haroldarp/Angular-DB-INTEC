import {Injectable} from '@angular/core';
import {PeticionesService} from './peticiones.service';
import {Store, select} from '@ngrx/store';
import {userState, selectAll, getCurrentDeleteGroup, getCurrentDeleteReservation, selectUserId} from '../store/index';
import * as userActions from '../store/user-state.actions';
import { Reservation } from '../models/reservation';

@Injectable({providedIn: 'root'})
export class StoreService{ 

    public myReservations:Reservation[];
    public myGroups:Reservation[];

    constructor(
        private _peticionesService: PeticionesService,
        private store:Store<userState>

    ){}

    loadReservations(userId){

        this._peticionesService.getReservas(1).subscribe(
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
    
    loadGroups(userId){
        this._peticionesService.getReservaGrupo(userId).subscribe(
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
}