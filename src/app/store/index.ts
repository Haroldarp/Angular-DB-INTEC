import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  createReducer,
  on,
  State,
} from '@ngrx/store';
import {UserInfo} from '../models/userInfo';
import {Reservation} from '../models/reservation';
import { environment } from '../../environments/environment';
import * as userActions from './user-state.actions';
import {EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity'

export const userStateFeatureKey = 'userState';

interface userInfoState extends EntityState<UserInfo>{}
interface userReservationState extends EntityState<Reservation>{}
interface userGroupReservationState extends EntityState<Reservation>{}


export interface userState {
  userReservation: userReservationState,
  user: userInfoState,
  userGroupReservation: userGroupReservationState
  error:any
}

const userAdapter:EntityAdapter<UserInfo> = createEntityAdapter<UserInfo>()
const userReservationAdapter:EntityAdapter<Reservation> = createEntityAdapter<Reservation>()
const userGroupReservationAdapter:EntityAdapter<Reservation> = createEntityAdapter<Reservation>()


export const initialState: userState = {
  user : userAdapter.getInitialState({}),
  userReservation : userReservationAdapter.getInitialState({}),
  userGroupReservation : userGroupReservationAdapter.getInitialState({}),
  error: undefined
};


export const reducers = createReducer(
  initialState,

  on ( userActions.loadUserSuccess, (state, action) =>{
    return {
      ...state,
      user: userAdapter.addAll(action.user, state.user)
    } 
      
  }),
  on ( userActions.loadUserFailure, (state, action) =>{
    return {
      ...state,
      error: action.error,
    };
  }),

  on ( userActions.loadReservationsSuccess, (state, action) =>{
    return {
      ...state,
      userReservation: userReservationAdapter.addAll(action.Reservations,state.userReservation),
    } 
      
  }),
  on ( userActions.loadReservationsFailure, (state, action) =>{
    return {
      ...state,
      error: action.error
    };
  }),

 
)

export const selectorsKey = createFeatureSelector<userState>(
  userStateFeatureKey
);

export const selectAll = createSelector(
  selectorsKey,
  (state: userState) => state
)


export const metaReducers: MetaReducer<userState>[] = !environment.production ? [] : [];
