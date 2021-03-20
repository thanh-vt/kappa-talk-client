export interface UtilState {
  status: 'INACTIVE' | 'ACTIVE' | 'CONNECTING';
}

export const initialState: UtilState = { status: 'INACTIVE' };

