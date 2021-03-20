import {ActionReducerMap} from '@ngrx/store';
import {AuthState} from './auth/auth.state';
import {authReducer} from './auth/auth.reducer';
import {UtilState} from './util/util.state';
import {utilReducer} from './util/util.reducer';

export interface RootState {
  auth: AuthState;
  util: UtilState;
}

export const reducers: ActionReducerMap<RootState> = {
  auth: authReducer,
  util: utilReducer
};
