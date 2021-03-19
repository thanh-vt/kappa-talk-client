import {ChatInfoModel} from '../../../shared/model/chat-info.model';

export const chatFeatureKey = 'chat';

export type DisplayStatus = 'online' | 'offline' | 'busy' | 'absent' | 'hidden';

export type ConnectionStatus = 'CONNECTING' | 'OPEN' | 'CLOSING' | 'CLOSED';

export interface ChatState {
  connectionStatus: ConnectionStatus;
  displayStatus: DisplayStatus;
  selectedChatTab: ChatInfoModel;
  chatTabList: ChatInfoModel[];
  userList: any;
}

export const initialState: ChatState = {
  connectionStatus: 'CLOSED',
  displayStatus: 'offline',
  selectedChatTab: null,
  chatTabList: [],
  userList: {}
};



