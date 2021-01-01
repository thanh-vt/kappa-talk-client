import {createSelector} from '@ngrx/store';
import {chatFeatureSelector} from '../index';

export const selectConnectionStatus = createSelector(
  chatFeatureSelector,
  chat => chat.connectionStatus
);

export const selectDisplayStatus = createSelector(
  chatFeatureSelector,
  chat => chat.displayStatus
);

export const selectChatInfo = createSelector(
  chatFeatureSelector,
  chat => chat.selectedChatTab
);



