import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatService} from '../../shared/service/chat.service';
import {ChatInfoModel} from '../../shared/model/chat-info.model';
import {IMessage, Message, StompHeaders} from '@stomp/stompjs/esm6';
import {Observable, Subscription} from 'rxjs';
import {RxStompService} from '@stomp/ng2-stompjs';
import {initConfig} from '../../rx-stomp.config';
import {RxStompState} from '@stomp/rx-stomp/esm6';
import {MessageModel} from '../../shared/model/message.model';

@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.scss']
})
export class ChatContainerComponent implements OnInit, OnDestroy {

  userList: any = {};
  username: string;
  recipient: string;
  state: number;
  connectionStatus: string;
  chatInfo: ChatInfoModel;
  nextMessage: MessageModel;
  serverHeaders$: Observable<StompHeaders>;
  private onlineUserSubscription: Subscription;
  private offLineUserSubscription: Subscription;

  constructor(private userService: ChatService, private rxStompService: RxStompService) {
    this.userService.chatInfoSubject.subscribe(next => {
      this.chatInfo = next;
    });
    this.rxStompService.connectionState$
    .subscribe((state: number) => {
      // convert numeric RxStompState to string
      this.state = state;
      this.connectionStatus = RxStompState[state];
      if (state === RxStompState.OPEN) {
        this.userService.userSubject.next(this.username);
      } else {
        this.userService.userSubject.next(null);
      }
    });
    // this.serverHeaders$ = rxStompService.serverHeaders$;
    // this.serverHeaders$.subscribe(next => {
    //   console.log(next);
    // });
    this.rxStompService.watch({destination: '/user/queue/greetings'})
    .subscribe((message: IMessage) => {
      const msg: MessageModel = JSON.parse(message.body);
      if (this.chatInfo && this.chatInfo.users.includes(msg.from) && this.chatInfo.users.includes(msg.to)) {
        this.nextMessage = msg;
      }
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

  onEnterChat(recipient): void {
    this.recipient = recipient;
    this.userService.getChatInfo(this.username, recipient).subscribe(next => {
      this.userService.chatInfoSubject.next(next);
    }, error => {
      console.log(error);
    });
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
