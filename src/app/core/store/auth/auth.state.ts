import { User } from '@core/services/auth.service';

export interface AuthState {
  user: User | null;
  token: string | null;
}

export const initialAuthState: AuthState = {
  user: null,
  token: null,
};
