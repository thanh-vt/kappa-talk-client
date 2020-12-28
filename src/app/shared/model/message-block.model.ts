import {MessageModel} from './message.model';

export interface MessageBlockModel {
  conversationId: number;
  users: string[];
  startTime: Date;
  messages: MessageModel[];
}
