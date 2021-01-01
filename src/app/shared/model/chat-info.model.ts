import {MessageBlockModel} from './message-block.model';

export interface ChatInfoModel {
  conversationId: number;
  startTime: Date;
  messageBlockList: MessageBlockModel[];
  users: string[];
  sender?: string;
  receiver?: string;
}
