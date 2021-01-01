import {createAction} from '@ngrx/store';

export const SettingAction = {
  loadSetting: createAction(
    '[Setting] Load Setting'
  ),

  applySetting: createAction(
    '[Setting] Apply Setting'
  )
};
