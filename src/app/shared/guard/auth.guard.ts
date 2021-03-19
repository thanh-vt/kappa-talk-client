import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild} from '@angular/router';
import {AuthState} from '../../store/auth/auth.state';
import {Store} from '@ngrx/store';
import {RootState} from '../../store';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  currentUserToken: AuthState;
  constructor(
    private router: Router,
    private store: Store<RootState>
  ) {
    this.store.select<AuthState>(state => state.auth).subscribe(
      currentUser => {
        this.currentUserToken = currentUser;
      }
    );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!!this.currentUserToken) {
      // logged in so return true
      return true;
    } else {
      // not logged in so redirect to login page with the return url
      this.router.navigate(['public','login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!!this.currentUserToken) {
      // logged in so return true
      return true;
    } else {
      // not logged in so redirect to login page with the return url
      this.router.navigate(['public','login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }
}
