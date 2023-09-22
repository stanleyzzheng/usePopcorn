import { ChangeDetectionStrategy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
// import { Movie } from 'src/app/movie';
import { MovieDetail } from 'src/app/movie-detail';
import { LoadingService } from 'src/app/services/loading.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieDetailComponent implements OnInit {
  // selectedMovie: MovieDetail | null = null;
  selectedMovie?: Observable<MovieDetail | null>;
  // private movieDetailsSubscription: Subscription | undefined;
  isLoading: Observable<boolean> = of(false);

  title: string = '';
  year: string = '';
  poster: string = '';
  runtime: string = '';
  imdbRating: string = '';
  plot: string = '';
  released: string = '';
  actors: string = '';
  director: string = '';
  genre: string = '';

  constructor(
    private movieService: MovieService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    // this.movieDetailsSubscription =
    //   this.movieService.selectedMovieDetail$.subscribe((movie) => {
    //     this.selectedMovie = movie || null;
    //     if (this.selectedMovie) {
    //       const {
    //         Title: title,
    //         Year: year,
    //         Poster: poster,
    //         Runtime: runtime,
    //         imdbRating,
    //         Plot: plot,
    //         Released: released,
    //         Actors: actors,
    //         Director: director,
    //         Genre: genre,
    //       } = this.selectedMovie;

    //       // Assign the destructured values to component properties
    //       this.title = title;
    //       this.year = year;
    //       this.poster = poster;
    //       this.runtime = runtime;
    //       this.imdbRating = imdbRating;
    //       this.plot = plot;
    //       this.released = released;
    //       this.actors = actors;
    //       this.director = director;
    //       this.genre = genre;
    //     }
    //   });
    this.selectedMovie = this.movieService.selectedMovieDetail$;

    this.isLoading = this.movieService.isLoadingMovieDetails$;
    this.selectedMovie.subscribe((movie) => {
      if (movie !== null) {
        const {
          Title: title,
          Year: year,
          Poster: poster,
          Runtime: runtime,
          imdbRating,
          Plot: plot,
          Released: released,
          Actors: actors,
          Director: director,
          Genre: genre,
        } = movie;

        // Assign the destructured values to component properties
        this.title = title;
        this.year = year;
        this.poster = poster;
        this.runtime = runtime;
        this.imdbRating = imdbRating;
        this.plot = plot;
        this.released = released;
        this.actors = actors;
        this.director = director;
        this.genre = genre;
      }
    });
  }
  handleCloseMovie() {
    this.movieService.clearSelectedMovie();
  }

  // ngOnDestroy() {
  //   if (this.movieDetailsSubscription)
  //     this.movieDetailsSubscription.unsubscribe();
  // }
}
