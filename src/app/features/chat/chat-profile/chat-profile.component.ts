import {Component, EventEmitter, Output} from '@angular/core';
import {Store} from '@ngrx/store';
import {RootState} from '../../../store';
import {Observable} from 'rxjs';
import {ConnectionStatus} from '../../store/chat/chat.state';
import {selectConnectionStatus} from '../../store/chat/chat.selectors';

@Component({
  selector: 'app-chat-profile',
  templateUrl: './chat-profile.component.html',
  styleUrls: ['./chat-profile.component.scss']
})
export class ChatProfileComponent {

  @Output() activateEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() deactivateEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() forceDisconnectEvent: EventEmitter<void> = new EventEmitter<void>();
  username: string;
  // @Input() connectionStatus: string;
  connectionStatus$: Observable<ConnectionStatus>;

  constructor(private store: Store<RootState>) {
    this.connectionStatus$ = this.store.select(selectConnectionStatus);
  }

  activate(): void {
    if (this.username) {
      this.activateEvent.emit(this.username);
    }
  }

  deactivate(): void {
    this.deactivateEvent.emit();
  }

  forceDisconnect(): void {
    this.forceDisconnectEvent.emit();
  }

}
