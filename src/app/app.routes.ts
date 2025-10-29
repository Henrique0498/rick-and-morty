import { Routes } from '@angular/router';
import { DashboardPage } from './features/dashboard/pages/dashboard';
import { NotFoundPage } from './features/notfound/page/notfound';
import { authGuard } from '@core/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
  },

  {
    path: 'characters',
    loadChildren: () =>
      import('./features/characters/characters.routes').then((m) => m.CHARACTERS_ROUTES),
  },

  {
    path: 'locations',
    loadChildren: () =>
      import('./features/locations/locations.routes').then((m) => m.LOCATIONS_ROUTES),
  },

  {
    path: 'episodes',
    loadChildren: () =>
      import('./features/episodes/episodes.routes').then((m) => m.EPISODES_ROUTES),
  },

  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },

  {
    path: 'profile',
    loadChildren: () => import('./features/profiles/profile.route').then((m) => m.PROFILE_ROUTES),
    canActivate: [authGuard],
  },

  {
    path: '**',
    component: NotFoundPage,
  },
];
