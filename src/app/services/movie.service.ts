import { Injectable } from '@angular/core';
import { Movie } from '../movie';
import { MOVIES } from '../mock-movies';
import {
  BehaviorSubject,
  Observable,
  catchError,
  finalize,
  map,
  of,
  tap,
  throwError,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MovieDetail } from '../movie-detail';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  private KEY = 'fe53aa19';
  private Url = `http://www.omdbapi.com/?apikey=${this.KEY}`;
  private movieData = new BehaviorSubject<Movie[] | null>(null);
  movieData$ = this.movieData.asObservable();
  private selectedMovieSubject = new BehaviorSubject<MovieDetail | null>(null);
  selectedMovieDetail$: Observable<MovieDetail | null> =
    this.selectedMovieSubject.asObservable();

  private isLoadingMoviesSubject = new BehaviorSubject<boolean>(false);
  isLoadingMovies$: Observable<boolean> =
    this.isLoadingMoviesSubject.asObservable();

  private isLoadingMovieDetailsSubject = new BehaviorSubject<boolean>(false);
  isLoadingMovieDetails$: Observable<boolean> =
    this.isLoadingMovieDetailsSubject.asObservable();

  // getMovies(): Observable<Movie[]> {
  //   const movies = of(MOVIES);
  //   return movies;
  // }

  getMovies(query: string): Observable<Movie> {
    const url = `${this.Url}&s=${query}`;
    return this.http.get<Movie>(url);
  }
  searchMovies(query: string): void {
    if (query.length < 3) return;
    this.isLoadingMoviesSubject.next(true);

    this.http
      .get<any>(`${this.Url}&s=${query}`)
      .pipe(
        catchError((error) => {
          console.error('Error fetching movies data', error);
          // return error;
          return throwError(() => error);
        }),
        map((data) => data.Search), // Extract 'Search' property from the response
        finalize(() => this.isLoadingMoviesSubject.next(false))
      )
      .subscribe((searchResults) => {
        this.movieData.next(searchResults);
      });
  }

  getMovieDetails(selectedId: string): void {
    this.isLoadingMovieDetailsSubject.next(true);
    this.http
      .get<any>(`${this.Url}&i=${selectedId}`)
      .pipe(
        catchError((error) => {
          console.error('Error fetching Movie detail', error);
          return throwError(() => error);
        }),
        finalize(() => this.isLoadingMovieDetailsSubject.next(false))
      )
      .subscribe((results) => {
        this.selectedMovieSubject.next(results);
      });
  }

  setSelectedMovie(movie: any) {
    this.selectedMovieSubject.next(movie);
  }

  clearSelectedMovie() {
    this.selectedMovieSubject.next(null);
  }
}
