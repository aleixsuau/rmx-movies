import { Route } from '@angular/router';
import { MovieFormComponent } from './feature/movie-form/movie-form.component';

export const moviesRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'enter'
  },
  {
    path: 'enter',
    component: MovieFormComponent,
  },
];
