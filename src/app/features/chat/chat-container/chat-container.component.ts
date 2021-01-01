import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatService} from '../../../shared/service/chat.service';
import {ChatInfoModel} from '../../../shared/model/chat-info.model';
import {IMessage, Message, StompHeaders} from '@stomp/stompjs/esm6';
import {Observable, Subscription} from 'rxjs';
import {RxStompService} from '@stomp/ng2-stompjs';
import {initConfig} from '../../../config/rx-stomp.config';
import {RxStompState} from '@stomp/rx-stomp/esm6';
import {MessageModel} from '../../../shared/model/message.model';
import {Store} from '@ngrx/store';
import {RootState} from '../../../store';
import {ChatActions} from '../../store/chat/chat.actions';
import {selectChatInfo} from '../../store/chat/chat.selectors';

@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.scss']
})
export class ChatContainerComponent implements OnInit, OnDestroy {

  userList: any = {};
  username: string;
  receiver: string;
  state: number;
  connectionStatus: string;
  chatInfo: ChatInfoModel;
  chatInfo$: Observable<ChatInfoModel>;
  serverHeaders$: Observable<StompHeaders>;
  private onlineUserSubscription: Subscription;
  private offLineUserSubscription: Subscription;

  constructor(private userService: ChatService, private rxStompService: RxStompService,
              private store: Store<RootState>) {
    this.chatInfo$ = this.store.select(selectChatInfo);
    this.chatInfo$.subscribe(next => {
      this.chatInfo = next;
    });
    this.rxStompService.connectionState$
    .subscribe((state: number) => {
      // convert numeric RxStompState to string
      const isLogout = this.state === RxStompState.CLOSING;
      this.state = state;
      this.connectionStatus = RxStompState[state];
      switch (state) {
        case RxStompState.CONNECTING:
          this.userService.userSubject.next(null);
          this.store.dispatch(ChatActions.connectChat({login: this.username, passcode: '123456'}));
          break;
        case RxStompState.OPEN:
          this.userService.userSubject.next(this.username);
          this.store.dispatch(ChatActions.connectChatSuccess());
          break;
        case RxStompState.CLOSING:
          this.userService.userSubject.next(null);
          this.store.dispatch(ChatActions.disconnectChat());
          break;
        case RxStompState.CLOSED:
          this.userService.userSubject.next(null);
          this.store.dispatch(ChatActions.connectChatFailed({isLogout}));
          break;
      }
    });
    // this.serverHeaders$ = rxStompService.serverHeaders$;
    // this.serverHeaders$.subscribe(next => {
    //   console.log(next);
    // });
    this.rxStompService.watch({destination: '/user/queue/greetings'})
    .subscribe((message: IMessage) => {
      const msg: MessageModel = JSON.parse(message.body);
      this.store.dispatch(ChatActions.loadNewMessage(msg));
    });
    this.userService.userSubject.subscribe(next => {
      if (next) {
        this.userService.getOnlineUsers().subscribe(next1 => {
          this.stopUpdateUserList();
          this.userList = next1;
          this.onlineUserSubscription = this.rxStompService.watch({destination: '/topic/online-user'})
          .subscribe((message: Message) => {
            this.userList[message.body] = true;
          });
          this.offLineUserSubscription = this.rxStompService.watch({destination: '/topic/offline-user'})
          .subscribe((message: Message) => {
            this.userList[message.body] = false;
          });
        });
      } else {
        this.stopUpdateUserList();
      }
    });
  }

  ngOnInit(): void {
  }

  stopUpdateUserList(): void {
    if (this.onlineUserSubscription) {
      this.onlineUserSubscription.unsubscribe();
    }
    if (this.offLineUserSubscription) {
      this.offLineUserSubscription.unsubscribe();
    }
    this.userList = {};
  }

  onActivate(username: string): void {
    this.username = username;
    this.rxStompService.configure(initConfig(username));
    this.rxStompService.activate();
  }

  onDeactivate(): void {
    this.username = null;
    this.rxStompService.deactivate();
  }

  onForceDisconnect(): void {
    this.username = null;
    this.rxStompService.stompClient.forceDisconnect();
  }

  ngOnDestroy(): void {
    this.stopUpdateUserList();
  }

}
