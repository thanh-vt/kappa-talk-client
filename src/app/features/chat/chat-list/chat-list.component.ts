import {Component, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import {CHAT_ACTIONS} from '../../store/chat/chat.actions';
import {Observable} from 'rxjs';
import {selectUserList} from '../../store/chat/chat.selectors';
import {AuthState} from '../../../store/auth/auth.state';
import {selectUserToken} from '../../../store/auth/auth.selector';

@Component({
  selector: 'app-user-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnDestroy {

  userList: any = {};
  userList$: Observable<any> = this.store.select(selectUserList);
  userName: string;
  userToken$: Observable<AuthState> = this.store.select(selectUserToken);

  constructor(private store: Store) {
    this.userToken$.subscribe(next => {
      this.userName = next.user_name;
    });
  }

  ngOnDestroy(): void {
  }

  enterChat(username: any) {
    this.store.dispatch(CHAT_ACTIONS.selectChat({sender: (this.userName), receiver: username}));
  }
}
