import { createReducer, on } from '@ngrx/store';
import { loginSuccess, logout } from './auth.actions';
import { initialAuthState } from './auth.state';

export const authReducer = createReducer(
  initialAuthState,
  on(loginSuccess, (state, { user }) => ({ ...state, user, loaded: true })),
  on(logout, (state) => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    return { ...state, user: null, loaded: true };
  })
);
