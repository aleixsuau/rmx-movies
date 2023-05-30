import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, combineLatest, debounceTime, distinctUntilChanged, filter, map, of, startWith, switchMap, tap } from 'rxjs';
import { Movie, MoviesAPIResponse, MoviesVM, SelectOption } from '../typings';
import { HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private readonly endpoint = 'https://www.omdbapi.com/?i=tt3896198&apikey=9d5d18ac';
  private readonly countryOptions: SelectOption[] = [
    {
      label: 'Ireland',
      value: 'ireland',
    },
    {
      label: 'United Kingdom',
      value: 'united_kingdom',
    }
  ];
  private readonly defaultVM: MoviesVM = {
    title: 'Roomex Movies',
    description: 'Where the best movies live...',
    country_options: this.countryOptions,
    movie_suggestions: [],    
  };
  private readonly movieSuggestionsQuerySubject = new BehaviorSubject<string>('');
  private readonly movieSuggestionsQueryDebounce = 500;
  private readonly movieSuggestions$ = this.movieSuggestionsQuerySubject.asObservable()
    .pipe(
      filter((query) => !!query),
      debounceTime(this.movieSuggestionsQueryDebounce),
      distinctUntilChanged(),
      switchMap(query => this.fetchMovieSuggestions(query)),
      startWith([]),
    );

  readonly vm$: Observable<MoviesVM> = combineLatest([
    of(this.defaultVM),
    this.movieSuggestions$,
  ]).pipe(map(([defaultVM, movie_suggestions]) =>({ ...defaultVM, movie_suggestions })));

  constructor(
    private readonly httpClient: HttpClient,
  ){}

  getMovieSuggestions(query: string): void {
    this.movieSuggestionsQuerySubject.next(query);
  }

  private fetchMovieSuggestions(query: string): Observable<Movie[]> {
    const options = query ?
      {
        params: new HttpParams()
          .set('type', 'movie')
          .set('s', query)
      } :
      {};

    return this.httpClient.get<MoviesAPIResponse>(`${this.endpoint}`, options)
      .pipe(
        map(response => response.Response === "True" ? response.Search! : [])
      );
  }
}