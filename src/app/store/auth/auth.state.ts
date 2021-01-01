export interface AuthState {
  status: string;
}

export const initialState: AuthState = {
  status: 'UNAUTHORIZED'
};

