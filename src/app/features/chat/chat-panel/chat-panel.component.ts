import {Component, OnInit} from '@angular/core';
import {ChatService} from '../../../shared/service/chat.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MessageModel} from '../../../shared/model/message.model';
import {ChatInfoModel} from '../../../shared/model/chat-info.model';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {selectChatInfo, selectConnectionStatus} from '../../store/chat/chat.selectors';
import {ConnectionStatus} from '../../store/chat/chat.state';
import {CHAT_ACTIONS} from '../../store/chat/chat.actions';

@Component({
  selector: 'app-chat-panel',
  templateUrl: './chat-panel.component.html',
  styleUrls: ['./chat-panel.component.scss']
})
export class ChatPanelComponent implements OnInit {

  chatInfo$: Observable<ChatInfoModel>;
  chatInfo: ChatInfoModel;
  chatForm: FormGroup;

  connectionStatus$: Observable<ConnectionStatus> = this.store.select(selectConnectionStatus);

  constructor(private userService: ChatService,
              private fb: FormBuilder, private store: Store) {
    this.chatInfo$ = this.store.select(selectChatInfo);
    this.chatInfo$.subscribe(next => {
      this.chatInfo = next;
    });
    this.chatForm = this.fb.group({
      content: ['', Validators.required],
    });
    this.connectionStatus$.subscribe(next => {
      if ('OPEN' === next) {
        this.chatForm.enable();
      } else {
        this.chatForm.disable();
      }
    });
  }

  ngOnInit() {
    // specific user topic
    // this.topicSubscription = this.rxStompService.watch('/user/topic/greetings')
    // .subscribe((message: Message) => {
    //   this.receivedMessages.push(message.body);
    // });
    // general topic
    // this.topicSubscription = this.rxStompService.watch('/topic/greetings')
    // .subscribe((message: Message) => {
    //   this.receivedMessages.push(message.body);
    // });
  }

  sendMessage() {
    if (this.chatForm.invalid && !this.chatInfo) {
      return;
    }
    // eslint-disable-next-line new-parens
    // const message = `Message generated at ${new Date}`;
    const message: MessageModel = {
      conversationId: this.chatInfo.conversationId,
      content: this.chatForm.get('content').value,
      timestamp: new Date(),
      from: this.chatInfo.sender,
      to: this.chatInfo.receiver
    };
    this.store.dispatch(CHAT_ACTIONS.sendMessage({
      destination: `/app/to-someone`,
      message: JSON.stringify(message)
    }));
    this.chatForm.reset();
  }

}
