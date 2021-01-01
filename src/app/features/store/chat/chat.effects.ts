import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {ChatService} from '../../../shared/service/chat.service';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {EMPTY} from 'rxjs';
import {ChatActions} from './chat.actions';

@Injectable()
export class ChatEffects {


  @Effect({dispatch: true, useEffectsErrorHandler: true})
  enterChat$ = this.actions$.pipe(
    ofType(ChatActions.selectChat),
    mergeMap(action => {
      const { sender, receiver } = action;
      return this.chatService.getChatInfo(sender, receiver)
      .pipe(
        map(chatInfo => {
          chatInfo.sender = sender;
          chatInfo.receiver = receiver;
          return ChatActions.loadChat({chatInfo});
        }),
        catchError(() => EMPTY)
      );
    })
  );

  constructor(private actions$: Actions, private chatService: ChatService) {
  }
}
