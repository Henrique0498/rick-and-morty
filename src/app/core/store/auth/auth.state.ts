import { User } from '@core/services/auth.service';

export interface AuthState {
  user: User | null;
  token: string | null;
  loaded: boolean;
}

const storedUser = (() => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const user = localStorage.getItem('user');
    return user ? (JSON.parse(user) as User) : null;
  } catch {
    return null;
  }
})();

const storedToken = (() => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    return localStorage.getItem('auth_token');
  } catch {
    return null;
  }
})();

export const initialAuthState: AuthState = {
  user: storedUser,
  token: storedToken,
  loaded: true,
};
