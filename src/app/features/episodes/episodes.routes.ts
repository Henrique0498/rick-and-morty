import { Routes } from '@angular/router';
import { EpisodesPage } from './pages/episodes/episodes';
import { EpisodeDetailsPage } from './pages/episode-details/episode-details';

export const EPISODES_ROUTES: Routes = [
  {
    path: '',
    component: EpisodesPage,
  },
  {
    path: ':id',
    component: EpisodeDetailsPage,
  },
];
