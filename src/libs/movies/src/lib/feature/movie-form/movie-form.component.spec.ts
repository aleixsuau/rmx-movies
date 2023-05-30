import { MovieFormComponent } from './movie-form.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';

describe('MovieFormComponent', () => {
  let spectator: Spectator<MovieFormComponent>;
  const createComponent = createComponentFactory(MovieFormComponent);

  beforeEach(() => spectator = createComponent());
});
