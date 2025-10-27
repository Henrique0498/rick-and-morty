import { Routes } from '@angular/router';
import { CharactersPage } from './features/characters/pages/characters';
import { App } from './app';
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
    path: '**',
    component: NotFoundPage,
  },
];
