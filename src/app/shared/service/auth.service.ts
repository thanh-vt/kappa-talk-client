import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {finalize, map} from 'rxjs/operators';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AuthState} from '../../store/auth/auth.state';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string, rememberMe: boolean) {
    const params = new HttpParams()
    .set('username', username)
    .set('password', password)
    .set('grant_type', 'password');
    const headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: 'Basic ' + btoa(`${environment.clientId}:${environment.clientSecret}`)
    });
    return this.http.post<AuthState>(`${environment.authEndpoint}/oauth/token`, params, {headers})
    .pipe(map(userToken => {
      if (rememberMe) {
        localStorage.setItem('userToken', JSON.stringify(userToken));
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.setItem('sessionToken', JSON.stringify(userToken));
        sessionStorage.setItem('userToken', JSON.stringify(userToken));
      }
      return userToken;
    }));
  }

  logout() {
    let token: string;
    if (localStorage.getItem('userToken')) {
      token = (JSON.parse(localStorage.getItem('userToken')) as AuthState).access_token;
    }
    if (sessionStorage.getItem('userToken')) {
      token = (JSON.parse(sessionStorage.getItem('userToken')) as AuthState).access_token;
    }
    this.http.delete<Observable<string>>(`${environment.authEndpoint}/oauth/token/revoke/${token}`)
    .pipe(finalize(() => {
      localStorage.removeItem('userToken');
      localStorage.removeItem('rememberMe');
      localStorage.removeItem('sessionToken');
      sessionStorage.removeItem('userToken');
    }))
    .subscribe(
      () => {
      },
      error => {
        console.log(error);
      });
  }
}
