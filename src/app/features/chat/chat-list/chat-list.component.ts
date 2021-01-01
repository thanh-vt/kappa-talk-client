import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {ChatActions} from '../../store/chat/chat.actions';

@Component({
  selector: 'app-user-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit, OnDestroy {

  @Input() userList: any = {};
  @Input() userName: string;

  constructor(private store: Store) {

  }

  ngOnInit(): void {
  }


  ngOnDestroy(): void {
  }

  enterChat(username: any) {
    this.store.dispatch(ChatActions.selectChat({sender: this.userName, receiver: username}));
  }
}
