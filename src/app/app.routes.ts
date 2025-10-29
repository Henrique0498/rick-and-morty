import { Routes } from '@angular/router';
import { CharactersPage } from './features/characters/pages/characters';
import { DashboardPage } from './features/dashboard/pages/dashboard';
import { NotFoundPage } from './features/notfound/page/notfound';
import { EpisodesPage } from './features/episodes/pages/episodes';

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
    component: EpisodesPage,
  },
  {
    path: '**',
    component: NotFoundPage,
  },
];
