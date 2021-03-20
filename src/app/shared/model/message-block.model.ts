import {MessageModel} from './message.model';

export interface MessageBlockModel {
  conversationId: string;
  users: string[];
  startTime: Date;
  messages: MessageModel[];
}
