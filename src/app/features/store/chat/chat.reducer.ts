import {createReducer, on} from '@ngrx/store';
import {ChatState, ConnectionStatus, initialState} from './chat.state';
import {StompConnectPayloadModel} from '../../../shared/model/stomp-connect-payload.model';
import {CHAT_ACTIONS} from './chat.actions';
import {MessageModel} from '../../../shared/model/message.model';
import {MessageBlockModel} from '../../../shared/model/message-block.model';

export const chatReducer = createReducer(
  initialState,
  on(CHAT_ACTIONS.connectChat, (state, payload: StompConnectPayloadModel) => ({
    ...state, connectionStatus: 'CONNECTING' as ConnectionStatus
  })),
  on(CHAT_ACTIONS.connectChatSuccess, state => ({
    ...state, connectionStatus: 'OPEN' as ConnectionStatus
  })),
  on(CHAT_ACTIONS.connectChatFailed, (state, {isLogout}) => ({
    ...state, connectionStatus: 'CLOSED' as ConnectionStatus
  })),
  on(CHAT_ACTIONS.disconnectChat, state => ({
    ...state, connectionStatus: 'CLOSING' as ConnectionStatus
  })),
  on(CHAT_ACTIONS.selectChat),
  on(CHAT_ACTIONS.loadChat, (state, {chatInfo}) => ({
    ...state, selectedChatTab: chatInfo
  })),
  on(CHAT_ACTIONS.updateOnlineUsers, (state, action) => ({
    ...state, userList: { ...state.userList, [action.username]: true }
  })),
  on(CHAT_ACTIONS.updateOfflineUsers, (state, action) => ({
    ...state, userList: { ...state.userList, [action.username]: false }
  })),
  on(CHAT_ACTIONS.cancelUsersUpdate, (state) => ({
    ...state, userList: {}
  })),
  on(CHAT_ACTIONS.getOnlineUsersSuccess, (state, action) => ({
    ...state, userList: action.users
  })),
  on(CHAT_ACTIONS.loadNewMessage, (state, message) => {
    let tmpState: ChatState = {...state};
    if (state.selectedChatTab && message.conversationId === state.selectedChatTab.conversationId) {
      const blockCount = state.selectedChatTab.messageBlockList.length;
      // state.selectedChatTab.messageBlockList[blockCount - 1].messages.push(message);
      const tmpMessages: MessageModel[] = state.selectedChatTab.messageBlockList[blockCount - 1].messages.slice();
      tmpMessages.push(message);
      const tmpMsgBlockList: MessageBlockModel[] = state.selectedChatTab.messageBlockList.slice();
      const tmpMsgBlock: MessageBlockModel = {...tmpMsgBlockList[blockCount - 1]};
      tmpMsgBlock.messages = tmpMessages;
      tmpMsgBlockList[blockCount - 1] = tmpMsgBlock;
      tmpState = {...tmpState,
        selectedChatTab: {
          ...tmpState.selectedChatTab,
          messageBlockList: tmpMsgBlockList
        }
      };
    }
    return tmpState;
  })
  )
;
