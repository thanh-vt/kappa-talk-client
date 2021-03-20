import {Injectable, Injector} from '@angular/core';

import {catchError, mergeMap} from 'rxjs/operators';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpParams,
  HttpRequest
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {Store} from '@ngrx/store';
import {RootState} from '../../store';
import {AuthState} from '../../store/auth/auth.state';
import {AUTH_ACTIONS} from '../../store/auth/auth.action';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  currentUserToken: AuthState;

  constructor(private store: Store<RootState>, private router: Router, private injector: Injector) {
    this.store.select<AuthState>(state => state.auth).subscribe(
      currentUser => {
        this.currentUserToken = currentUser;
      }
    );
  }

  private static modifyRequest(req: HttpRequest<any>) {
    if (req.serializeBody() == null || !req.serializeBody().toString().includes('refresh_token')) {
      let accessToken;
      if (localStorage.getItem('userToken')) {
        accessToken = (JSON.parse(localStorage.getItem('userToken')) as AuthState).access_token;
        return req.clone({setHeaders: {authorization: `Bearer ${accessToken}`}});
      } else if (sessionStorage.getItem('userToken')) {
        accessToken = (JSON.parse(sessionStorage.getItem('userToken')) as AuthState).access_token;
        return req.clone({setHeaders: {authorization: `Bearer ${accessToken}`}});
      } else {
        return req.clone();
      }
    } else {
      return req.clone();
    }
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('userToken') || sessionStorage.getItem('userToken')) {
      return next.handle(TokenInterceptor.modifyRequest(request)).pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 400 && request.url.includes('/oauth/token')) {
              this.store.dispatch(AUTH_ACTIONS.logout());
              // if (error.error.error_description.includes('Invalid refresh token')) {
              //   const returnToHome = setTimeout(() => {
              //     location.reload();
              //     clearTimeout(returnToHome);
              //   }, 3000);
              // }
              // this.router.navigate(['/home'])
              //   .finally(() => {
              //     location.reload();
              //   });
            } else if (error.status === 401) {
              let refreshToken: string;
              if (localStorage.getItem('userToken')) {
                refreshToken = ( JSON.parse(localStorage.getItem('userToken')) as AuthState).refresh_token;
              }
              if (sessionStorage.getItem('userToken')) {
                refreshToken = ( JSON.parse(sessionStorage.getItem('userToken')) as AuthState).refresh_token;
              }
              const params = new HttpParams()
                .set('grant_type', 'refresh_token')
                .set('refresh_token', refreshToken);
              // eslint-disable-next-line @typescript-eslint/naming-convention
              const headers = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
                // eslint-disable-next-line @typescript-eslint/naming-convention
                Authorization : 'Basic ' + btoa(`${environment.clientId}:${environment.clientSecret}`)});
              return this.injector.get(HttpClient)
                .post(`${environment.authEndpoint}/oauth/token`, params.toString(), {headers})
                .pipe(mergeMap(
                  res => {
                    if (localStorage.getItem('rememberMe')) {
                      localStorage.setItem('userToken', JSON.stringify(res));
                    } else {
                      localStorage.setItem('sessionToken', JSON.stringify(res));
                      sessionStorage.setItem('userToken', JSON.stringify(res));
                    }
                    return next.handle(TokenInterceptor.modifyRequest(request)).pipe(catchError((err) => {
                      if (err.status === 500 && request.url.includes('/oauth/token')) {
                        location.reload();
                      }
                      return next.handle(TokenInterceptor.modifyRequest(request));
                    }));
                  }
                ));
            } else {
              return throwError(new Error(error.message));
            }
          } else {
            return throwError(new Error(error));
          }
        })
      );
    } else {
      return next.handle(request);
    }
  }
}
