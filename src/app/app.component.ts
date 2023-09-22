import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieService } from './services/movie.service';
import { MovieDetail } from './movie-detail';
import { Subscription } from 'rxjs';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'usePopcorn';
  selectedMovie: MovieDetail | null = null;
  private selectedMovieSubscription: Subscription | undefined;
  isLoading: boolean = false;
  private isLoadingSubscription: Subscription | undefined;

  constructor(
    private movieService: MovieService,
    private isLoadingService: LoadingService
  ) {}

  ngOnInit() {
    this.selectedMovieSubscription =
      this.movieService.selectedMovieDetail$.subscribe((movie) => {
        this.selectedMovie = movie;
      });

    this.isLoadingSubscription = this.isLoadingService.isLoading$.subscribe(
      (value) => {
        this.isLoading = value;
      }
    );
  }

  ngOnDestroy() {
    if (this.selectedMovieSubscription) {
      this.selectedMovieSubscription.unsubscribe();
    }
  }
}
