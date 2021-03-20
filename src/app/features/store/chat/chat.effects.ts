import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {ChatService} from '../../chat/service/chat.service';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import {CHAT_ACTIONS} from './chat.actions';
import {SocketClientService} from '../../chat/service/socket-client.service';
import {Store} from '@ngrx/store';
import {RootState} from '../../../store';
import {Message} from 'stompjs';

@Injectable()
export class ChatEffects {

  @Effect({dispatch: true, useEffectsErrorHandler: true})
  connectChat = this.actions$.pipe(
    ofType(CHAT_ACTIONS.connectChat),
    mergeMap(action =>
      this.socketClientService.init(action.login, action.passcode)
      .pipe(
        map(() => CHAT_ACTIONS.connectChatSuccess()),
        catchError(() => of(CHAT_ACTIONS.connectChatFailed({isLogout: false})))
      ))
  );

  @Effect({dispatch: false, useEffectsErrorHandler: true})
  disconnectChat = this.actions$.pipe(
    ofType(CHAT_ACTIONS.disconnectChat),
    tap(() => {
        this.socketClientService.close();
        this.store.dispatch(CHAT_ACTIONS.cancelUsersUpdate());
      }
    )
  );

  @Effect({dispatch: true, useEffectsErrorHandler: true})
  enterChat$ = this.actions$.pipe(
    ofType(CHAT_ACTIONS.selectChat),
    mergeMap(action => {
      const {sender, receiver} = action;
      return this.chatService.getChatInfo(sender, receiver)
      .pipe(
        map(chatInfo => {
          chatInfo.sender = sender;
          chatInfo.receiver = receiver;
          return CHAT_ACTIONS.loadChat({chatInfo});
        }),
        catchError(() => EMPTY)
      );
    })
  );

  @Effect({dispatch: true, useEffectsErrorHandler: true})
  getOnlineUsers$ = this.actions$.pipe(
    ofType(CHAT_ACTIONS.getOnlineUsers),
    mergeMap(() => this.chatService.getOnlineUsers()
      .pipe(
        map((users) => CHAT_ACTIONS.getOnlineUsersSuccess({users})),
        catchError(() => EMPTY)
      ))
  );

  @Effect({dispatch: false, useEffectsErrorHandler: true})
  subscribeChannel$ = this.actions$.pipe(
    ofType(CHAT_ACTIONS.subscribeChannel),
    tap(action => {
        switch (action.channelName) {
          case '/topic/online-user':
            this.socketClientService.watch(action.channelName,
              (message: Message) => {
                this.store.dispatch(CHAT_ACTIONS.updateOnlineUsers({username: message.body}));
              });
            break;
          case '/topic/offline-user':
            this.socketClientService.watch(action.channelName,
              (message: Message) => {
                this.store.dispatch(CHAT_ACTIONS.updateOfflineUsers({username: message.body}));
              });
            break;
          default:
            this.socketClientService.watch(action.channelName, (message => {
              const msg = JSON.parse(message.body);
              console.log('Message: ', msg);
              this.store.dispatch(CHAT_ACTIONS.loadNewMessage(msg));
            }));
        }
      }
    ));

  @Effect({dispatch: false, useEffectsErrorHandler: true})
  sendMessage = this.actions$.pipe(
    ofType(CHAT_ACTIONS.sendMessage),
    tap((action) => {
      this.socketClientService.send(action.destination, action.message);
    })
  );

  constructor(private actions$: Actions, private store: Store<RootState>, private chatService: ChatService,
              private socketClientService: SocketClientService) {
  }
}
