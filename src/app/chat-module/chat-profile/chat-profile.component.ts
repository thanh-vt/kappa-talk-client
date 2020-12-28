import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-chat-profile',
  templateUrl: './chat-profile.component.html',
  styleUrls: ['./chat-profile.component.scss']
})
export class ChatProfileComponent implements OnInit {

  username: string;
  @Input() connectionStatus: string;
  @Output() activateEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() deactivateEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() forceDisconnectEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor() {

  }

  ngOnInit(): void {

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
