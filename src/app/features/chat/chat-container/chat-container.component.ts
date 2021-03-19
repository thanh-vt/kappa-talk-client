import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatService} from '../../../shared/service/chat.service';
import {ChatInfoModel} from '../../../shared/model/chat-info.model';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {RootState} from '../../../store';
import {CHAT_ACTIONS} from '../../store/chat/chat.actions';
import {selectChatInfo, selectConnectionStatus, selectUserList} from '../../store/chat/chat.selectors';
import {SocketClientService} from '../../../shared/service/socket-client.service';

@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.scss']
})
export class ChatContainerComponent implements OnInit, OnDestroy {

  userList: any = {};
  userList$: Observable<any> = this.store.select<any>(selectUserList);
  username: string;
  chatInfo: ChatInfoModel;
  chatInfo$: Observable<ChatInfoModel> = this.store.select<ChatInfoModel>(selectChatInfo);

  constructor(private userService: ChatService, private socketClientService: SocketClientService,
              private store: Store<RootState>) {
    this.chatInfo$.subscribe(next => {
      this.chatInfo = next;
    });
    this.userList$.subscribe(next => {
      this.userList = next;
    });
    this.store.select(state => state.auth).subscribe(userToken => {
      if (userToken.user_name) {
        this.username = userToken.user_name;
        this.store.dispatch(CHAT_ACTIONS.connectChat({
          login: userToken.user_name,
          passcode: userToken.access_token
        }));
      }
    });
    this.store.select(selectConnectionStatus).subscribe(next => {
      if (next === 'OPEN' && this.username) {
        this.store.dispatch(CHAT_ACTIONS.getOnlineUsers());
        // this.store.dispatch(CHAT_ACTIONS.subscribeChannel({ channelName: '/user/exchange/amq.direct/chat.message' }));
        this.store.dispatch(CHAT_ACTIONS.subscribeChannel({ channelName: '/exchange/greetings', username: this.username }));
        // this.store.dispatch(CHAT_ACTIONS.subscribeChannel({ channelName: '/user/queue/greetings' }));
        this.store.dispatch(CHAT_ACTIONS.subscribeChannel({ channelName: '/topic/online-user' }));
        this.store.dispatch(CHAT_ACTIONS.subscribeChannel({ channelName: '/topic/offline-user' }));
      }
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}
