import {createAction} from '@ngrx/store';

export const AuthAction = {
  login: createAction(
    '[Auth] Login'
  ),

  loginSuccess: createAction(
    '[Auth] LoginSuccess'
  ),

  loginFailed: createAction(
    '[Auth] LoginFailed'
  ),

  logout: createAction(
    '[Auth] Logout'
  )
};
