import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import {AuthState} from '../../store/auth/auth.state';
import {AuthService} from '../../public/service/auth.service';
import {Store} from '@ngrx/store';
import {RootState} from '../../store';
import {AUTH_ACTIONS} from '../../store/auth/auth.actions';


@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate, CanActivateChild, CanLoad {
  currentUser: AuthState;

  constructor(private router: Router, private store: Store<RootState>) {
    this.store.select<AuthState>(state => state.auth).subscribe(
      next => {
        this.currentUser = next;
      }
    );
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let hasRoleAdmin = false;
    if (!!this.currentUser) {
      const authorities = this.currentUser.authorities;
      for (const authority of authorities) {
        if (authority === 'ROLE_ADMIN') {
          hasRoleAdmin = true;
          break;
        }
      }
      if (hasRoleAdmin) {
        return true;
      } else {
        this.store.dispatch(AUTH_ACTIONS.logout());
        this.router.navigate(['/', 'admin', 'dashboard'], { queryParams: {login: true}, queryParamsHandling: 'merge' } );
        return false;
      }
    } else {
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/', 'admin', 'login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }
  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!!this.currentUser) {
      const authorities = this.currentUser.authorities;
      let hasRoleAdmin = false;
      for (const authority of authorities) {
        if (authority === 'ROLE_ADMIN') {
          hasRoleAdmin = true;
          break;
        }
      }
      return hasRoleAdmin;
    } else {
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/', 'admin', 'login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }
  canLoad(route: Route, segments: UrlSegment[]) {
    return true;
  }
}
