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
  userGroupReservation: userGroupReservationState,
  error:any,
  currentDeleteReservation:string,
  currentDeleteGroup:string
}

const userAdapter:EntityAdapter<UserInfo> = createEntityAdapter<UserInfo>()
const userReservationAdapter:EntityAdapter<Reservation> = createEntityAdapter<Reservation>()
const userGroupReservationAdapter:EntityAdapter<Reservation> = createEntityAdapter<Reservation>()


export const initialState: userState = {
  user : userAdapter.getInitialState({}),
  userReservation : userReservationAdapter.getInitialState({}),
  userGroupReservation : userGroupReservationAdapter.getInitialState({}),
  error: undefined,
  currentDeleteReservation:"",
  currentDeleteGroup:""
};


export const reducers = createReducer(
  initialState,

  //user
  on ( userActions.loadUserSuccess, (state, action) =>{
    return {
      ...state,
      user: userAdapter.addOne(action.user, state.user)
    } 
      
  }),
  on ( userActions.loadUserFailure, (state, action) =>{
    return {
      ...state,
      error: action.error,
    };
  }),

  //reservations
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

  //groups
  on ( userActions.loadGroupsSuccess, (state, action) =>{
    return {
      ...state,
      userGroupReservation: userGroupReservationAdapter.addAll(action.Groups,state.userGroupReservation),
    } 
      
  }),
  on ( userActions.loadGroupsFailure, (state, action) =>{
    return {
      ...state,
      error: action.error
    };
  }),

  //delete reservation
  on ( userActions.deleteReservationSuccess, (state, action) =>{
    return {
      ...state,
      userReservation: userReservationAdapter.removeOne(action.id,state.userReservation),
    } 
      
  }),
  on ( userActions.deleteReservationFailure, (state, action) =>{
    return {
      ...state,
      error: action.error
    };
  }),

  
   //delete Group
   on ( userActions.deleteGroupSuccess, (state, action) =>{
    return {
      ...state,
      userGroupReservation: userGroupReservationAdapter.removeOne(action.id,state.userGroupReservation),
    } 
      
  }),
  on ( userActions.deleteGroupFailure, (state, action) =>{
    return {
      ...state,
      error: action.error
    };
  }),

  //set currentDelete
  on ( userActions.setCurrentDeleteReservation, (state, action) =>{
    return {
      ...state,
      currentDeleteReservation: action.id
    };

  }),on ( userActions.setCurrentDeleteGroup, (state, action) =>{
    return {
      ...state,
      currentDeleteGroup: action.id
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

export const getCurrentDeleteReservation = createSelector(
  selectorsKey,
  (state: userState) => state.currentDeleteReservation
)

export const getCurrentDeleteGroup = createSelector(
  selectorsKey,
  (state: userState) => state.currentDeleteGroup
)

export const selectUserId = createSelector(
  selectorsKey,
  (state: userState) => state.user.ids
)


export const metaReducers: MetaReducer<userState>[] = !environment.production ? [] : [];
