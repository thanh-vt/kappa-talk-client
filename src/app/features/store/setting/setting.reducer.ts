import {createReducer, on} from '@ngrx/store';
import {initialState} from './setting.state';
import {SettingAction} from './setting.action';


export const settingReducer = createReducer(
  initialState,
  on(SettingAction.applySetting),
  on(SettingAction.loadSetting)
);
