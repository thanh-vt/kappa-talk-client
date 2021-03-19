import {OtherInfo} from '../../shared/model/other-info';
import {UserProfile} from '../../shared/model/user-profile';
import {Setting} from '../../shared/model/setting';

export interface AuthState {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  user_name?: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  access_token?: string | null;
  authorities?: string[] | null;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  expires_in?: number | null;
  id?: number | null;
  other?: OtherInfo | null;
  profile?: UserProfile | null;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  refresh_token?: string | null;
  scope?: string | null;
  setting?: Setting | null;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  token_type?: 'bearer' | null;
}

export const initialState: AuthState = (localStorage.getItem('userToken') ?
  JSON.parse(localStorage.getItem('userToken')) :
  (sessionStorage.getItem('userToken') ? JSON.parse(sessionStorage.getItem('userToken')) : null));

