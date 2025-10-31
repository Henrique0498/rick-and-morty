import { createReducer, on } from '@ngrx/store';
import { loginSuccess, logout } from './auth.actions';
import { initialAuthState } from './auth.state';

export const authReducer = createReducer(
  initialAuthState,
  on(loginSuccess, (state, { user, token }) => {
    try {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('auth_token', token);
    } catch {}
    return { ...state, user, token, loaded: true };
  }),
  on(logout, (state) => {
    try {
      localStorage.removeItem('user');
      localStorage.removeItem('auth_token');
    } catch {}

    return { ...state, user: null, token: null, loaded: true };
  })
);
