import {createSelector} from '@ngrx/store';
import {settingFeatureSelector} from '../index';

export const selectSetting = createSelector(
  settingFeatureSelector,
  (setting) => setting.setting
);
