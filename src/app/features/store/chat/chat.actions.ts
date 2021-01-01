import {createAction, props} from '@ngrx/store';
import {StompConnectPayloadModel} from '../../../shared/model/stomp-connect-payload.model';
import {ChatInfoModel} from '../../../shared/model/chat-info.model';
import {MessageModel} from '../../../shared/model/message.model';

export const ChatActions = {
  connectChat: createAction(
    '[Chat] ConnectChat',
    props<StompConnectPayloadModel>()
  ),

  connectChatSuccess: createAction(
    '[Chat] ConnectChatSuccess'
  ),

  connectChatFailed: createAction(
    '[Chat] ConnectChatFailed',
    props<{ isLogout: boolean }>()
  ),

  disconnectChat: createAction(
    '[Chat] DisconnectChat'
  ),

  selectChat: createAction(
    '[Chat] Select Chat',
    props<{ sender: string; receiver: string }>()
  ),

  loadChat: createAction(
    '[Chat] Load Chat',
    props<{ chatInfo: ChatInfoModel }>()
  ),

  loadNewMessage: createAction(
    '[Chat] Load New Message',
    props<MessageModel>()
  )
};

