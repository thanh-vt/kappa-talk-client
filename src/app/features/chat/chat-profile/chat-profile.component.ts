import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {RootState} from '../../../store';
import {Observable} from 'rxjs';
import {ConnectionStatus} from '../../store/chat/chat.state';
import {selectConnectionStatus} from '../../store/chat/chat.selectors';
import {AUTH_ACTIONS} from '../../../store/auth/auth.actions';
import {AuthState} from '../../../store/auth/auth.state';
import {selectUserToken} from '../../../store/auth/auth.selectors';

@Component({
  selector: 'app-chat-profile',
  templateUrl: './chat-profile.component.html',
  styleUrls: ['./chat-profile.component.scss']
})
export class ChatProfileComponent {

  username: string;
  userToken$: Observable<AuthState> = this.store.select(selectUserToken);
  connectionStatus$: Observable<ConnectionStatus> = this.store.select(selectConnectionStatus);
  defaultImageUrl = 'https://st.quantrimang.com/photos/image/2017/04/08/anh-dai-dien-FB-200.jpg';

  constructor(private store: Store<RootState>) { }

  logout() {
    this.store.dispatch(AUTH_ACTIONS.logout());
  }

}
