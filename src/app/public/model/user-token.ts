import {Setting} from '../../features/store/setting/setting.state';
import {Role} from './role';

export interface UserToken {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  access_token: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  token_type: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  refresh_token: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  expires_in: number;
  scope: string;
  id: number;
  roles: [Role];
  username: string;
  avatarUrl: string;
  setting: Setting;
}
