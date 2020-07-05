import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  createReducer,
  on,
} from '@ngrx/store';
import {UserInfo} from '../models/userInfo';
import { environment } from '../../environments/environment';
import * as userActions from './user-state.actions';

export const userStateFeatureKey = 'userState';

export interface userState {
  user: UserInfo;
  error: any;
  
}

export const initialState: userState = {
  user: undefined,
  error: undefined
};

export const reducers = createReducer(
  initialState,
  on ( userActions.loadUserSuccess, (state, action) =>{
    return {
      user: action.user
    };
  }),
  on ( userActions.loadUserFailure, (state, action) =>{
    return {
      user: state.user,
      error: action.error
    };
  }),
)


export const metaReducers: MetaReducer<userState>[] = !environment.production ? [] : [];
