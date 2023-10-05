import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieService } from './services/movie.service';
import { MovieDetail } from './movie-detail';
import { Subscription } from 'rxjs';
// import { LoadingService } from './services/loading.service';
import { LocalStorageService } from './services/local-storage.service';
import { watched } from './watched';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'usePopcorn';
  selectedMovie$: MovieDetail | null = null;
  private selectedMovieSubscription: Subscription | undefined;
  isLoading: boolean = false;
  watchedMovies: watched[] = [];

  constructor(
    private movieService: MovieService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.loadWatchedMovies();

    this.selectedMovieSubscription =
      this.movieService.selectedMovieDetail$.subscribe((movie) => {
        this.selectedMovie$ = movie;
      });
  }
  loadWatchedMovies(): void {
    const storedWatchedMovies = this.localStorageService.get<watched[]>(
      'watched',
      []
    );
    if (storedWatchedMovies) this.watchedMovies = storedWatchedMovies;
  }

  addWatchedMovie(movie: watched): void {
    this.watchedMovies.push(movie);
    this.localStorageService.set('watched', this.watchedMovies);
  }

  removeWatchedMovie(remove: watched): void {
    this.watchedMovies = this.watchedMovies.filter(
      (movie) => movie.imdbID !== remove.imdbID
    );
    this.localStorageService.set('watched', this.watchedMovies);
  }

  ngOnDestroy() {
    if (this.selectedMovieSubscription) {
      this.selectedMovieSubscription.unsubscribe();
    }
  }
}
