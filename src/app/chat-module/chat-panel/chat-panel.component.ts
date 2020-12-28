import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {RxStompService} from '@stomp/ng2-stompjs';
import {ChatService} from '../../shared/service/chat.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MessageModel} from '../../shared/model/message.model';
import {RxStompState} from '@stomp/rx-stomp/esm6';
import {ChatInfoModel} from '../../shared/model/chat-info.model';

@Component({
  selector: 'app-chat-panel',
  templateUrl: './chat-panel.component.html',
  styleUrls: ['./chat-panel.component.scss']
})
export class ChatPanelComponent implements OnInit, OnChanges {

  @Input() chatInfo: ChatInfoModel;
  @Input() username: string;
  @Input() recipient: string;
  @Input() state: number;
  chatForm: FormGroup;

  constructor(private rxStompService: RxStompService, private userService: ChatService, private fb: FormBuilder) {
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
    // tslint:disable-next-line:new-parens
    // const message = `Message generated at ${new Date}`;
    const message: MessageModel = {
      content: this.chatForm.get('content').value,
      timestamp: new Date(),
      from: this.username,
      to: this.recipient
    };
    this.rxStompService.publish({
      destination: `/app/to-someone`,
      body: JSON.stringify(message)
    });
    this.chatForm.reset();
  }

}
