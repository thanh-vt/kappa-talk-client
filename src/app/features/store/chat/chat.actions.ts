import {createAction, props} from '@ngrx/store';
import {StompConnectPayloadModel} from '../../../shared/model/stomp-connect-payload.model';
import {ChatInfoModel} from '../../../shared/model/chat-info.model';
import {MessageModel} from '../../../shared/model/message.model';
import {UserInfo} from 'os';

export const CHAT_ACTIONS = {
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

  subscribeChannel: createAction(
    '[Chat] Subscribe Channel',
    props<{ channelName: string; username?: string }>()
  ),

  updateOnlineUsers: createAction(
    '[Chat] Update online users',
    props<{ username: string }>()
  ),

  updateOfflineUsers: createAction(
    '[Chat] Update offline users',
    props<{ username: string }>()
  ),

  cancelUsersUpdate: createAction(
    '[Chat] Cancel users update',
  ),

  loadChat: createAction(
    '[Chat] Load Chat',
    props<{ chatInfo: ChatInfoModel }>()
  ),

  sendMessage: createAction(
    '[Chat] Send message',
    props<{ destination: string; message: string }>()
  ),

  loadNewMessage: createAction(
    '[Chat] Load New Message',
    props<MessageModel>()
  ),

  getOnlineUsers: createAction(
    '[Chat] Get Online Users'
  ),

  getOnlineUsersSuccess: createAction(
    '[Chat] Get Online Users Success',
    props<{ users: any }>()
  ),
};

