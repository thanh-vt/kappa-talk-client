import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {RootState} from './store';
import {AUTH_ACTIONS} from './store/auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Welcome to Kappa Talk';
  userToken$ = this.store.select(state => state.auth);

  constructor(private store: Store<RootState>) {
  }

}
