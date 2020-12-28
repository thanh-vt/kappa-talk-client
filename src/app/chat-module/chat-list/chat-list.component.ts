import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit, OnDestroy {

  @Input() userList: any = {};
  @Output() enterChatEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor() {

  }

  ngOnInit(): void {
  }


  ngOnDestroy(): void {
  }

  enterChat(username: any) {
    this.enterChatEvent.emit(username);
  }
}
