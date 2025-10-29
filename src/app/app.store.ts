import { provideStore } from '@ngrx/store';
import { authReducer } from '@core/store/auth/auth.reducer';

export const appStore = provideStore({ auth: authReducer });
