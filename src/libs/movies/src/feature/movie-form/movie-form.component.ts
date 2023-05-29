import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'rmx-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieFormComponent {}
