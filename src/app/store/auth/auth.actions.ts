import {createAction, props} from '@ngrx/store';
import {LoginPayload} from '../../public/model/login-payload';
import {AuthState} from './auth.state';

export const AUTH_ACTIONS = {
  login: createAction<any, any>(
    '[Auth] Login',
    props<{payload: LoginPayload}>()
  ),

  loginSuccess: createAction<any, any>(
    '[Auth] LoginSuccess',
    props<{payload: AuthState}>()
  ),

  loginFailed: createAction(
    '[Auth] LoginFailed'
  ),

  logout: createAction(
    '[Auth] Logout'
  )
};
