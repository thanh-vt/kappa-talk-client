import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {AUTH_ACTIONS} from './auth.action';
import {AuthService} from '../../shared/service/auth.service';
import {Router} from '@angular/router';
import {LoginPayload} from '../../public/model/login-payload';
import {AuthState} from './auth.state';
import {EMPTY, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthEffects {

  @Effect({dispatch: true, useEffectsErrorHandler: true})
  login$ = this.actions$.pipe(
    ofType(AUTH_ACTIONS.login),
    mergeMap((payload: LoginPayload) => {
      const {username, password, rememberMe} = payload;
      return this.authService.login(username, password, rememberMe)
      .pipe(
        map(userToken => AUTH_ACTIONS.loginSuccess(userToken)),
        catchError(() => of(AUTH_ACTIONS.loginFailed()))
      );
    })
  );

  @Effect({dispatch: false, useEffectsErrorHandler: true})
  loginSuccess$ = this.actions$.pipe(
    ofType(AUTH_ACTIONS.loginSuccess),
    tap((userToken: AuthState) => {
      this.router.navigate(['features','chat']);
      return EMPTY;
    })
  );

  @Effect({dispatch: false, useEffectsErrorHandler: true})
  logout$ = this.actions$.pipe(
    ofType(AUTH_ACTIONS.logout),
    tap(() => {
      this.authService.logout();
      this.router.navigate(['public','login']);
    })
  );

  constructor(private actions$: Actions, private authService: AuthService,
              private router: Router) { }
}
