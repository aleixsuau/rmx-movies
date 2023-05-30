import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MovieFormComponent } from './feature/movie-form/movie-form.component';
import { moviesRoutes } from './movies.routes';
import { CardModule } from 'primeng/card';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ThankYouComponent } from './feature/thank-you/thank-you.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(moviesRoutes),
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    CardModule,
    DropdownModule,
    AutoCompleteModule,
  ],
  declarations: [MovieFormComponent, ThankYouComponent],
})
export class MoviesModule {}
