import {Action, createReducer, on} from '@ngrx/store';
import {AuthState, initialState} from './auth.state';
import {AUTH_ACTIONS} from './auth.action';

export const authReducer = createReducer<AuthState, Action>(
  initialState,
  on(AUTH_ACTIONS.login, state => state),
  on(AUTH_ACTIONS.loginSuccess, (state, actionPayload) => ({...state, ...actionPayload})),
  on(AUTH_ACTIONS.loginFailed, state => state),
  on(AUTH_ACTIONS.logout, state => ({}))
);

