import { createAction, props } from '@ngrx/store';
import {UserInfo} from '../models/userInfo';
import {Reservation} from '../models/reservation';

export const loadUser = createAction(
  '[User login] Load User'
);

export const loadUserSuccess = createAction(
  '[User login effect] Load User Success',
  props<{ user: UserInfo[] }>()
);

export const loadUserFailure = createAction(
  '[User login effect] Load User Failure',
  props<{ error: any }>()
);

export const loadReservations = createAction(
  '[User login] Load Reservations'
);

export const loadReservationsSuccess = createAction(
  '[User login effect] Load Reservations Success',
  props<{ Reservations: Reservation[] }>()
);

export const loadReservationsFailure = createAction(
  '[User login effect] Load Reservations Failure',
  props<{ error: any }>()
);
