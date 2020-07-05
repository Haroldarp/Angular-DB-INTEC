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
    mergeMap(() => 
    this._peticionesService.getUser().pipe(
        map(user => userActions.loadUserSuccess({user})),
        catchError(error => of(userActions.loadUserFailure({error})))
      ))
    )
  );

  constructor(private actions$: Actions, private _peticionesService:PeticionesService) {}

}
