import {createReducer, on} from '@ngrx/store';
import {ChatState, ConnectionStatus, initialState} from './chat.state';
import {StompConnectPayloadModel} from '../../../shared/model/stomp-connect-payload.model';
import {ChatActions} from './chat.actions';
import {MessageModel} from '../../../shared/model/message.model';
import {MessageBlockModel} from '../../../shared/model/message-block.model';

export const chatReducer = createReducer(
  initialState,
  on(ChatActions.connectChat, (state, payload: StompConnectPayloadModel) => ({
    ...state, connectionStatus: 'CONNECTING' as ConnectionStatus
  })),
  on(ChatActions.connectChatSuccess, state => ({
    ...state, connectionStatus: 'OPEN' as ConnectionStatus
  })),
  on(ChatActions.connectChatFailed, (state, {isLogout}) => ({
    ...state, connectionStatus: 'CLOSED' as ConnectionStatus
  })),
  on(ChatActions.disconnectChat, state => ({
    ...state, connectionStatus: 'CLOSING' as ConnectionStatus
  })),
  on(ChatActions.selectChat),
  on(ChatActions.loadChat, (state, {chatInfo}) => ({
    ...state, selectedChatTab: chatInfo
  })),
  on(ChatActions.loadNewMessage, (state, message) => {
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
