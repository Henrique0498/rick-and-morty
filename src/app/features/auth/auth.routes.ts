import { Routes } from '@angular/router';
import { LoginPage } from './login/login';
import { SingUpPage } from './sing-up/sing-up';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'sing-up',
    component: SingUpPage,
  },
];
