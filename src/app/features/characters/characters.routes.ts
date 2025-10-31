import { Routes } from '@angular/router';
import { CharactersPage } from './pages/characters/characters';
import { CharacterDetailsPage } from './pages/character-details/character-details';

export const CHARACTERS_ROUTES: Routes = [
  {
    path: '',
    component: CharactersPage,
  },

  {
    path: ':id',
    component: CharacterDetailsPage,
  },
];
