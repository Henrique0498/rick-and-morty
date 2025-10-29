import { Routes } from '@angular/router';
import { CharactersPage } from './features/characters/pages/characters';
import { DashboardPage } from './features/dashboard/pages/dashboard';
import { NotFoundPage } from './features/notfound/page/notfound';

export const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
  },

  {
    path: 'characters',
    component: CharactersPage,
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
    path: '**',
    component: NotFoundPage,
  },
];
