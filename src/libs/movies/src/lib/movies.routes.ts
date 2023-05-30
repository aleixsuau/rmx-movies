import { Route } from '@angular/router';
import { MovieFormComponent } from './feature/movie-form/movie-form.component';
import { ThankYouComponent } from './feature/thank-you/thank-you.component';

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
  {
    path: 'thank-you',
    component: ThankYouComponent,
  },
];
