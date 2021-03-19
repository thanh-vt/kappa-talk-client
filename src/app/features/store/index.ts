import {chatFeatureKey, ChatState} from './chat/chat.state';
import {createFeatureSelector} from '@ngrx/store';
import {settingFeatureKey, SettingState} from './setting/setting.state';
import {RootState} from '../../store';

export interface FeatureRootState extends RootState {
  [chatFeatureKey]: ChatState;
  [settingFeatureKey]: SettingState;
}

export const chatFeatureSelector = createFeatureSelector<FeatureRootState, ChatState>(chatFeatureKey);

export const settingFeatureSelector = createFeatureSelector<FeatureRootState, SettingState>(settingFeatureKey);

