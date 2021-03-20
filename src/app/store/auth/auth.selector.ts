import {RootState} from '../index';

export const selectUserToken = (state: RootState) => state.auth;
