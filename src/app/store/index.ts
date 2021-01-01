import {ActionReducerMap} from '@ngrx/store';
import {AuthState} from './auth/auth.state';
import {authReducer} from './auth/auth.reducer';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RootState {
  auth: AuthState;
}

export const reducers: ActionReducerMap<RootState> = {
  auth: authReducer,
};
