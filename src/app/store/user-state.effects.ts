import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {PeticionesService} from '../services/peticiones.service';
import * as userActions from './user-state.actions';
import {of} from 'rxjs';
import {map, mergeMap, catchError} from 'rxjs/operators'



@Injectable()
export class UserStateEffects {


  loadUser$ = createEffect(() => this.actions$.pipe(
    ofType(userActions.loadUser),
    mergeMap(action => 
    this._peticionesService.getUserById(action.userId).pipe(
        map(user => userActions.loadUserSuccess({user})),
        catchError(error => of(userActions.loadUserFailure({error})))
      ))
    )
  );

  loadReservations$ = createEffect(() => this.actions$.pipe(
    ofType(userActions.loadReservations),
    mergeMap(() => 
    this._peticionesService.getReservations().pipe(
        map(Reservations => userActions.loadReservationsSuccess({Reservations})),
        catchError(error => of(userActions.loadReservationsFailure({error})))
      ))
    )
  );

  loadGroups$ = createEffect(() => this.actions$.pipe(
    ofType(userActions.loadGroups),
    mergeMap(() => 
    this._peticionesService.getGroups().pipe(
        map(Groups => userActions.loadGroupsSuccess({Groups})),
        catchError(error => of(userActions.loadGroupsFailure({error})))
      ))
    )
  );

  deleteReservation$ = createEffect(() => this.actions$.pipe(
    ofType(userActions.deleteReservation),
    mergeMap( action => 
    this._peticionesService.deleteReservation(action.id).pipe(
        map(() => userActions.deleteReservationSuccess({id: action.id})),
        catchError(error => of(userActions.deleteReservationFailure({error})))
      ))
    )
  );

  
  deleteGroup$ = createEffect(() => this.actions$.pipe(
    ofType(userActions.deleteGroup),
    mergeMap( action => 
    this._peticionesService.deleteGroup(action.id).pipe(
        map(() => userActions.deleteGroupSuccess({id: action.id})),
        catchError(error => of(userActions.deleteGroupFailure({error})))
      ))
    )
  );


  constructor(private actions$: Actions, private _peticionesService:PeticionesService) {}

}
