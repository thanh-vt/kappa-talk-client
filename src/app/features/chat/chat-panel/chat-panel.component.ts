import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {RxStompService} from '@stomp/ng2-stompjs';
import {ChatService} from '../../../shared/service/chat.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MessageModel} from '../../../shared/model/message.model';
import {RxStompState} from '@stomp/rx-stomp/esm6';
import {ChatInfoModel} from '../../../shared/model/chat-info.model';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {selectChatInfo} from '../../store/chat/chat.selectors';

@Component({
  selector: 'app-chat-panel',
  templateUrl: './chat-panel.component.html',
  styleUrls: ['./chat-panel.component.scss']
})
export class ChatPanelComponent implements OnInit, OnChanges {

  @Input() state: number;

  chatInfo$: Observable<ChatInfoModel>;
  chatInfo: ChatInfoModel;
  chatForm: FormGroup;

  constructor(private rxStompService: RxStompService, private userService: ChatService,
              private fb: FormBuilder, private store: Store) {
    this.chatInfo$ = this.store.select(selectChatInfo);
    this.chatInfo$.subscribe(next => {
      this.chatInfo = next;
    });
    this.chatForm = this.fb.group({
      content: ['', Validators.required],
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.state) {
      if (RxStompState.OPEN === this.state) {
        this.chatForm.enable();
      } else {
        this.chatForm.disable();
      }
    }
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
    this.rxStompService.publish({
      destination: `/app/to-someone`,
      body: JSON.stringify(message)
    });
    this.chatForm.reset();
  }

}
