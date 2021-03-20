import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatService} from '../service/chat.service';
import {ChatInfoModel} from '../../../shared/model/chat-info.model';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {RootState} from '../../../store';
import {CHAT_ACTIONS} from '../../store/chat/chat.actions';
import {selectChatInfo, selectConnectionStatus, selectUserList} from '../../store/chat/chat.selectors';
import {SocketClientService} from '../service/socket-client.service';
import {ConnectionStatus} from '../../store/chat/chat.state';
import {ChatConstant} from '../constant/chat.constant';

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
  connectionStatus: ConnectionStatus;
  connectionStatus$: Observable<ConnectionStatus> = this.store.select(selectConnectionStatus);

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
    this.connectionStatus$ = this.store.select(selectConnectionStatus);
    this.connectionStatus$.subscribe(next => {
      this.connectionStatus = next;
      if (next === 'OPEN' && this.username) {
        this.store.dispatch(CHAT_ACTIONS.getOnlineUsers());
        this.store.dispatch(CHAT_ACTIONS.subscribeChannel({ channelName: '/user' + ChatConstant.privateChat }));
        this.store.dispatch(CHAT_ACTIONS.subscribeChannel({ channelName: '/user' + ChatConstant.onlineUser }));
        this.store.dispatch(CHAT_ACTIONS.subscribeChannel({ channelName: ChatConstant.offlineUser }));
      }
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}
