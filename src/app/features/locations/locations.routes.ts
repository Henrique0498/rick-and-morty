import { Routes } from '@angular/router';
import { LocationsPage } from './pages/locations/locations';
import { LocationDetailsPage } from './pages/location-details/location-details';

export const LOCATIONS_ROUTES: Routes = [
  {
    path: '',
    component: LocationsPage,
  },

  {
    path: ':id',
    component: LocationDetailsPage,
  },
];
