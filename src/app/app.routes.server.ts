import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'characters', renderMode: RenderMode.Prerender },
  { path: 'episodes', renderMode: RenderMode.Prerender },
  { path: 'locations', renderMode: RenderMode.Prerender },
  { path: 'auth/login', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Server },
];
