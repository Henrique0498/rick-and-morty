import { User } from '@core/services/auth.service';

export interface AuthState {
  user: User | null;
  token: string | null;
  loaded: boolean;
}

const storedUser = (() => {
  if (typeof window === 'undefined') return null;
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
})();

export const initialAuthState: AuthState = {
  user: storedUser,
  token: null,
  loaded: false,
};
