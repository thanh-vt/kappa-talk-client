import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ScrollToBottomDirective} from '../../shared/directive/scroll-to-bottom.directive';
import {MessageModel} from '../../shared/model/message.model';
import {ChatInfoModel} from '../../shared/model/chat-info.model';

@Component({
  selector: 'app-chat-content',
  templateUrl: './chat-content.component.html',
  styleUrls: ['./chat-content.component.scss']
})
export class ChatContentComponent implements OnInit, OnChanges {

  @Input() nextMessage: MessageModel;
  @Input() chatInfo: ChatInfoModel;
  @Input() username: string;
  @Input() recipient: string;
  @ViewChild('scrollDir') scroll: ScrollToBottomDirective;

  constructor() {
  }

  ngOnInit(): void {
    this.scroll.scrollToBottom();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nextMessage && this.chatInfo) {
      const blockCount = this.chatInfo.messageBlockList.length;
      this.chatInfo.messageBlockList[blockCount - 1].messages.push(this.nextMessage);
      this.scroll.scrollToBottom();
    }
  }
}
