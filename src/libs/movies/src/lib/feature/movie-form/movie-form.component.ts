import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MoviesService } from '../../data-access/movies.service';
import { Movie, MovieFormValue } from '../../typings';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'rmx-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieFormComponent implements OnInit, OnDestroy {
  readonly vm$ = this.moviesService.formVM$;
  readonly movieForm = this.formBuilder.nonNullable.group(
    {
      name: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      username: ['', [Validators.email]],
      country: ['', [Validators.required]],
      post_code: [''],
      favourite_movie: this.formBuilder.nonNullable.control<Movie | undefined>(undefined),
    },
    { updateOn: 'submit' },
  );
  countryInputSubscription?: Subscription;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly moviesService: MoviesService,
    private readonly router: Router,
  ) {}

  ngOnInit() {
    this.setPostalCodeValidationsOnCountryChange();
  }

  ngOnDestroy() {
    this.countryInputSubscription?.unsubscribe();
  }

  getMovieSuggestions(query: string) {
    this.moviesService.getMovieSuggestions(query);
  }

  submitForm(form: FormGroup) {
    const formValue: MovieFormValue = form.getRawValue();
    
    if (form.valid) {
      this.moviesService.setMovieFormState(formValue);
      this.router.navigate(['thank-you']);
    }
  }

  private setPostalCodeValidationsOnCountryChange() {
    this.countryInputSubscription = this.movieForm.get('country')?.valueChanges.subscribe(country => {
      this.movieForm.get('post_code')?.reset();

      if (country === 'ireland') {
        this.movieForm
          .get('post_code')
          ?.setValidators([Validators.minLength(6), Validators.maxLength(10)]);
      }

      if (country === 'united_kingdom') {
        this.movieForm
          .get('post_code')
          ?.setValidators([
            Validators.required,
            Validators.pattern('^[A-Za-z]{1,2}[0-9Rr][0-9A-Za-z]? [0-9][ABD-HJLNP-UW-Zabdhjlnp-uw-z]{2}$')
          ]);
      }

      this.movieForm.get('post_code')?.updateValueAndValidity();
    })
  }
}

