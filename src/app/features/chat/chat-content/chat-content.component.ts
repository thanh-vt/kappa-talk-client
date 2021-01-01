import {AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {ScrollToBottomDirective} from '../../../shared/directive/scroll-to-bottom.directive';
import {MessageModel} from '../../../shared/model/message.model';
import {ChatInfoModel} from '../../../shared/model/chat-info.model';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {selectChatInfo} from '../../store/chat/chat.selectors';
import {withLatestFrom} from 'rxjs/operators';

@Component({
  selector: 'app-chat-content',
  templateUrl: './chat-content.component.html',
  styleUrls: ['./chat-content.component.scss']
})
export class ChatContentComponent implements AfterViewInit, OnChanges {

  // @Input() nextMessage: MessageModel;
  // @Input() chatInfo: ChatInfoModel;
  chatInfo$: Observable<ChatInfoModel>;
  @Input() username: string;
  // @Input() receiver: string;
  @ViewChild('scrollDir') scroll: ScrollToBottomDirective;

  constructor(private store: Store) {
    this.chatInfo$ = this.store.select(selectChatInfo);
  }

  ngAfterViewInit(): void {
    if (this.scroll) {
      this.scroll.scrollToBottom();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes.nextMessage && this.chatInfo$ && this.scroll) {
    //   const blockCount = this.chatInfo.messageBlockList.length;
    //   this.chatInfo.messageBlockList[blockCount - 1].messages.push(this.nextMessage);
    //   this.scroll.scrollToBottom();
    // }d
  }
}
