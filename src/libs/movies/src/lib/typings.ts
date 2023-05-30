export interface Movie {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

export interface MoviesVM {
  country_options: SelectOption[];
  movie_suggestions: Movie[];
  title: string,
  description: string;
}

export interface SelectOption {
  label: string;
  value: string;
}

export interface MoviesAPIResponse {
  Response: 'True' | 'False';
  Search?: Movie[];
  totalResults?: number;
  Error?: string;
}

export interface MovieFormValue {
  name: string;
  username?: string;
  country: string;
  post_code?: string;
  favourite_movie?: Movie;
}



