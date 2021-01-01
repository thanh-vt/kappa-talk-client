export const settingFeatureKey = 'setting';

export interface Setting {
  id?: number;
  theme?: string;
  alert?: boolean;
  darkMode?: boolean;
}

export interface SettingState {
  setting: Setting;
}

export const initialState: SettingState = {
  setting: {
    theme: 'light',
    alert: true
  }
};

