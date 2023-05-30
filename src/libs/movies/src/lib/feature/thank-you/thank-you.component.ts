import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MoviesService } from '../../data-access/movies.service';

@Component({
  selector: 'rmx-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThankYouComponent {
  readonly vm$ = this.moviesService.thankYouVM$;

  constructor(
    private readonly moviesService: MoviesService,
  ) {}
}
