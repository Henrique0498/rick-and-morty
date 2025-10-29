import { createReducer, on } from '@ngrx/store';
import { loginSuccess, logout } from './auth.actions';
import { initialAuthState } from './auth.state';

export const authReducer = createReducer(
  initialAuthState,
  on(loginSuccess, (state, { user, token }) => ({ ...state, user, token })),
  on(logout, (state) => ({ ...state, user: null, token: null }))
);
