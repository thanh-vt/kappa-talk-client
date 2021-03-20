import {MessageBlockModel} from './message-block.model';

export interface ChatInfoModel {
  conversationId: string;
  startTime: Date;
  messageBlockList: MessageBlockModel[];
  users: string[];
  sender?: string;
  receiver?: string;
}
