import { createAction, props } from '@ngrx/store';
import {UserInfo} from '../models/userInfo';
import {Reservation} from '../models/reservation';

//user
export const loadUser = createAction(
  '[User login] Load User'
);

export const loadUserSuccess = createAction(
  '[User login effect] Load User Success',
  props<{ user: UserInfo }>()
);

export const loadUserFailure = createAction(
  '[User login effect] Load User Failure',
  props<{ error: any }>()
);

//reservations
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


//groups
export const loadGroups = createAction(
  '[User login] Load Groups'
);

export const loadGroupsSuccess = createAction(
  '[User login effect] Load Groups Success',
  props<{ Groups: Reservation[] }>()
);

export const loadGroupsFailure = createAction(
  '[User login effect] Load Groups  Failure',
  props<{ error: any }>()
);

//delete reservations
export const deleteReservation = createAction(
  '[userReservation my-reservations] delete Reservations',
  props<{ id: string }>()
);

export const deleteReservationSuccess = createAction(
  '[userReservation my-reservations effect] delete Reservations Success',
  props<{ id: string }>()
);

export const deleteReservationFailure = createAction(
  '[userReservation my-reservations effect] delete Reservations Failure',
  props<{ error: any }>()
);


//delete group
export const deleteGroup = createAction(
  '[userReservationGroup my-reservations] delete Group',
  props<{ id: string }>()
);

export const deleteGroupSuccess = createAction(
  '[userReservationGroup my-reservations effect] delete Group Success',
  props<{ id: string }>()
);

export const deleteGroupFailure = createAction(
  '[userReservationGroup my-reservations effect] delete Group Failure',
  props<{ error: any }>()
);


//set currentDelete
export const setCurrentDeleteReservation = createAction(
  '[currentDeleteReservation my-reservations] delete reservation',
  props<{ id: string }>()
);

export const setCurrentDeleteGroup = createAction(
  '[currentDeleteGroup my-reservations] delete Group',
  props<{ id: string  }>()
);