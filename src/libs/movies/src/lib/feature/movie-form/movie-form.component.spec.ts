import { ReactiveFormsModule } from '@angular/forms';
import { MovieFormComponent } from './movie-form.component';
import { Spectator, byTestId, createComponentFactory, mockProvider } from '@ngneat/spectator/jest';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MoviesService } from '../../data-access/movies.service';
import { MoviesVM } from '../../typings';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});


describe('MovieFormComponent', () => {
  let spectator: Spectator<MovieFormComponent>;
  const mockMovies = [
    {
      "Title": "O Brother, Where Art Thou?",
      "Year": "2000",
      "imdbID": "tt0190590",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMjZkOTdmMWItOTkyNy00MDdjLTlhNTQtYzU3MzdhZjA0ZDEyXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"
    },
    {
      "Title": "The Art of Getting By",
      "Year": "2011",
      "imdbID": "tt1645080",
      "Type": "movie",
      "Poster": "https://m.media-amazon.com/images/M/MV5BNDg3NzE5MjU3MV5BMl5BanBnXkFtZTcwNjY1NTgxNQ@@._V1_SX300.jpg"
    },
  ]
  const defaultVM: MoviesVM = {
    title: 'Roomex Movies',
    description: 'Where the best movies live...',
    country_options: [
      {
        label: 'Ireland',
        value: 'ireland',
      },
      {
        label: 'United Kingdom',
        value: 'united_kingdom',
      }
    ],
    movie_suggestions: mockMovies,
  };
  const validUKPostalCode = 'aR5z 9AB';
  const selectCountry = (
    country: 'ireland' | 'united_kingdom',
    spectator: Spectator<MovieFormComponent>
  ) => {
    spectator.component.movieForm.patchValue({ country });
    spectator.detectChanges();
  };

  const createComponent = createComponentFactory({
    component: MovieFormComponent,
    imports: [
      CommonModule,
      ButtonModule,
      ReactiveFormsModule,
      InputTextModule,
      CardModule,
      DropdownModule,
      AutoCompleteModule,
    ],
    providers: [
      mockProvider(MoviesService, {
        formVM$: of(defaultVM)
      }),
    ],
  });

  beforeEach(() => spectator = createComponent());

  describe('UI', () => {
    describe('Header', () => {
      it('should display the correct elements', () => {
        expect(spectator.query(byTestId('movie-form'))).toExist();
        expect(spectator.query(byTestId('movie-form-header'))?.querySelector('h3')?.textContent).toContain(defaultVM.title);
        expect(spectator.query(byTestId('movie-form-header'))?.querySelector('h5')?.textContent).toContain(defaultVM.description);
      });
    });

    describe('Inputs', () => {
      it('should display the correct inputs', () => {
        expect(spectator.query(byTestId('movie-form-name'))?.querySelector('label')?.textContent).toContain('Name');
        expect(spectator.query(byTestId('movie-form-name-input'))).toExist();
        expect(spectator.query(byTestId('movie-form-name-required-error'))).not.toExist();
        expect(spectator.query(byTestId('movie-form-name-pattern-error'))).not.toExist();

        expect(spectator.query(byTestId('movie-form-username'))?.querySelector('label')?.textContent).toContain('Username');
        expect(spectator.query(byTestId('movie-form-username-input'))).toExist();
        expect(spectator.query(byTestId('movie-form-username-email-error'))).not.toExist();

        expect(spectator.query(byTestId('movie-form-country'))?.querySelector('label')?.textContent).toContain('Country');
        expect(spectator.query(byTestId('movie-form-country-input'))).toExist();
        expect(spectator.query(byTestId('movie-form-country-required-error'))).not.toExist();

        expect(spectator.query(byTestId('movie-form-post_code'))?.querySelector('label')?.textContent).toContain('Post Code');
        expect(spectator.query(byTestId('movie-form-post_code-input'))).toExist();
        expect(spectator.query(byTestId('movie-form-post_code-minlength-error'))).not.toExist();
        expect(spectator.query(byTestId('movie-form-post_code-maxlength-error'))).not.toExist();
        expect(spectator.query(byTestId('movie-form-post_code-required-error'))).not.toExist();
        expect(spectator.query(byTestId('movie-form-post_code-pattern-error'))).not.toExist();

        expect(spectator.query(byTestId('movie-form-favourite_movie'))?.querySelector('label')?.textContent).toContain('Favourite Movie');
        expect(spectator.query(byTestId('movie-form-favourite_movie-input'))).toExist();

        expect(spectator.query(byTestId('movie-form-submit-button'))?.textContent).toContain('Submit');
      });
    });
  });

  describe('Functionality', () => {
    describe('Validation', () => {
      describe('Name Input', () => {
        it('should validate that the name is filled', () => {
          const submitButton = spectator.query(byTestId('movie-form-submit-button'))!;

          spectator.click(submitButton);

          expect(spectator.query(byTestId('movie-form-name-required-error'))).toExist();
        });

        it('should validate that the name does not contain numbers', () => {
          const nameInput = spectator.query(byTestId('movie-form-name-input'))!;
          const submitButton = spectator.query(byTestId('movie-form-submit-button'))!;

          expect(spectator.query(byTestId('movie-form-name-pattern-error'))).not.toExist();      

          spectator.typeInElement('name4', nameInput);
          spectator.click(submitButton);

          expect(spectator.query(byTestId('movie-form-name-pattern-error'))).toExist();
          
          spectator.typeInElement('name', nameInput);
          spectator.click(submitButton);

          expect(spectator.query(byTestId('movie-form-name-pattern-error'))).not.toExist();      
        });
      });

      describe('Username Input', () => {
        it('should be optional', () => {
          const submitButton = spectator.query(byTestId('movie-form-submit-button'))!;

          spectator.click(submitButton);

          expect(spectator.query(byTestId('movie-form-username-email-error'))).not.toExist();
        });

        it('should be an email when present', () => {
          const usernameInput = spectator.query(byTestId('movie-form-username-input'))!;
          const submitButton = spectator.query(byTestId('movie-form-submit-button'))!;

          spectator.typeInElement('hi4', usernameInput);
          spectator.click(submitButton);

          expect(spectator.query(byTestId('movie-form-username-email-error'))).toExist();

          spectator.typeInElement('hi@4.com', usernameInput);
          spectator.click(submitButton);

          expect(spectator.query(byTestId('movie-form-username-email-error'))).not.toExist();
        });
      });

      describe('Country Input', () => {
        it('should be required', () => {          
          const submitButton = spectator.query(byTestId('movie-form-submit-button'))!;

          spectator.click(submitButton);

          expect(spectator.query(byTestId('movie-form-country-required-error'))).toExist();

          selectCountry('ireland', spectator);  

          expect(spectator.query(byTestId('movie-form-country-required-error'))).not.toExist();
        });
      });

      describe('Post Code Input', () => {
        describe('When country is Ireland', () => {
          it('should not be required', () => {
            const submitButton = spectator.query(byTestId('movie-form-submit-button'))!;

            selectCountry('ireland', spectator);

            spectator.click(submitButton);

            expect(spectator.query(byTestId('movie-form-post_code-required-error'))).not.toExist();
          });

          it('should have from 6 to 10 characters', () => {
            const submitButton = spectator.query(byTestId('movie-form-submit-button'))!;
            const postCodeInput = spectator.query(byTestId('movie-form-post_code-input'))!;

            selectCountry('ireland', spectator);

            spectator.typeInElement('XX', postCodeInput);
            spectator.click(submitButton);

            expect(spectator.query(byTestId('movie-form-post_code-minlength-error'))).toExist();

            spectator.typeInElement('XXXXXXX', postCodeInput);
            spectator.click(submitButton);

            expect(spectator.query(byTestId('movie-form-post_code-minlength-error'))).not.toExist();
            expect(spectator.query(byTestId('movie-form-post_code-maxlength-error'))).not.toExist();

            spectator.typeInElement('XXXXXXXXXXXXXXXXXXXXXX', postCodeInput);
            spectator.click(submitButton);

            expect(spectator.query(byTestId('movie-form-post_code-maxlength-error'))).toExist();
          });
        });

        describe('When country is United Kingdom', () => {
          it('should be required', () => {
            const postCodeInput = spectator.query(byTestId('movie-form-post_code-input'))!;
            const submitButton = spectator.query(byTestId('movie-form-submit-button'))!;

            selectCountry('united_kingdom', spectator);

            spectator.click(submitButton);

            expect(spectator.query(byTestId('movie-form-post_code-required-error'))).toExist();

            spectator.typeInElement(validUKPostalCode, postCodeInput);
            spectator.click(submitButton);

            expect(spectator.query(byTestId('movie-form-post_code-required-error'))).not.toExist();
          });

          it('should be a valid postal code', () => {
            const submitButton = spectator.query(byTestId('movie-form-submit-button'))!;
            const postCodeInput = spectator.query(byTestId('movie-form-post_code-input'))!;

            selectCountry('united_kingdom', spectator);

            spectator.typeInElement('XX', postCodeInput);
            spectator.click(submitButton);

            expect(spectator.query(byTestId('movie-form-post_code-pattern-error'))).toExist();

            spectator.typeInElement(validUKPostalCode, postCodeInput);
            spectator.click(submitButton);

            expect(spectator.query(byTestId('movie-form-post_code-pattern-error'))).not.toExist();
          });
        });
      });
    });

    describe('Submit', () => {
      it('should submit the form', () => {
        const formValue = {
          name: 'test',
          username: 'ho@test.com',
          country: 'ireland',
          post_code: 'qweqwe',
          favourite_movie: mockMovies[0],
        }
        const submitButton = spectator.query(byTestId('movie-form-submit-button'))!;

        jest.spyOn(spectator.component, 'submitForm');

        spectator.component.movieForm.setValue(formValue);

        spectator.click(submitButton);

        expect(spectator.component.submitForm).toHaveBeenCalledWith(spectator.component.movieForm);
      });
    });
  });
});
