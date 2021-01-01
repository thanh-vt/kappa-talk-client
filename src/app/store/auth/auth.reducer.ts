import {createReducer, on} from '@ngrx/store';
import {initialState} from './auth.state';
import {AuthAction} from './auth.actions';

export const authReducer = createReducer(
  initialState,
  on(AuthAction.login)
);

