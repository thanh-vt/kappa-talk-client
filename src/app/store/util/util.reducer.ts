import {Action, createReducer, on} from '@ngrx/store';
import {initialState, UtilState} from './util.state';
import {UTIL_ACTION} from './util.action';

export const utilReducer = createReducer<UtilState, Action>(
  initialState,
  on(UTIL_ACTION.pingServices, state => ({...state, status: 'CONNECTING'})),
  on(UTIL_ACTION.pingServicesSuccess, state => ({...state, status: 'ACTIVE'})),
  on(UTIL_ACTION.pingServicesFailed, state => ({...state, status: 'INACTIVE'})),
);
