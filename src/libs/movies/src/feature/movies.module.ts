import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MovieFormComponent } from './movie-form/movie-form.component';
import { moviesRoutes } from './movies.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(moviesRoutes),
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
  ],
  declarations: [
    MovieFormComponent,
  ],
})
export class MoviesModule { }