import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', loadChildren: () => import('@rmx/movies').then((m) => m.MoviesModule) },
  {
    path: '**',
    redirectTo: '',
  }
];
