import {
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
  Input,
} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
// import { Movie } from 'src/app/movie';
import { MovieDetail } from 'src/app/movie-detail';
import { MovieService } from 'src/app/services/movie.service';
import { watched } from 'src/app/watched';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieDetailComponent implements OnInit {
  selectedMovie?: Observable<MovieDetail | null>;
  isLoading: Observable<boolean> = of(false);
  @Output() addWatchedMovie = new EventEmitter<watched>();
  @Input() watchedMovies: watched[] = [];
  isWatched: boolean = false;

  userRating: number = 0;

  imdbID: string = '';
  title: string = '';
  year: string = '';
  poster: string = '';
  runtime: string = '';
  imdbRating: number = 0;
  plot: string = '';
  released: string = '';
  actors: string = '';
  director: string = '';
  genre: string = '';
  watchedUserRating: number | undefined = 0;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.selectedMovie = this.movieService.selectedMovieDetail$;

    this.isLoading = this.movieService.isLoadingMovieDetails$;
    this.selectedMovie.subscribe((movie) => {
      if (movie !== null) {
        this.imdbID = movie.imdbID;

        this.isWatched = this.watchedMovies
          .map((movie) => movie.imdbID)
          .includes(movie.imdbID);

        if (this.isWatched) {
          this.watchedUserRating = this.watchedMovies.find(
            (movie) => movie.imdbID === this.imdbID
          )?.userRating;
        }

        const {
          Title: title,
          Year: year,
          Poster: poster,
          Runtime: runtime,
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
        this.imdbRating = movie.imdbRating;
        this.plot = plot;
        this.released = released;
        this.actors = actors;
        this.director = director;
        this.genre = genre;
      }
    });
  }

  onSetRating(rating: number) {
    this.userRating = rating;
  }

  handleCloseMovie() {
    this.movieService.clearSelectedMovie();
  }

  handleAddWatched(): void {
    const newWatched: watched = {
      imdbID: this.imdbID,
      title: this.title,
      year: this.year,
      poster: this.poster,
      runtime: Number(this.runtime.split(' ').at(0)),
      imdbRating: Number(this.imdbRating),
      userRating: this.userRating,
    };
    this.addWatchedMovie.emit(newWatched);
    this.handleCloseMovie();
  }
}
