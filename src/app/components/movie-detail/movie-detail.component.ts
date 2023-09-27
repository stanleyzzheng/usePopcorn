import { ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
// import { Movie } from 'src/app/movie';
import { MovieDetail } from 'src/app/movie-detail';
import { LoadingService } from 'src/app/services/loading.service';
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

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.selectedMovie = this.movieService.selectedMovieDetail$;

    this.isLoading = this.movieService.isLoadingMovieDetails$;
    this.selectedMovie.subscribe((movie) => {
      if (movie !== null) {
        console.log(movie);
        this.imdbID = movie.imdbID;

        const {
          Title: title,
          Year: year,
          Poster: poster,
          Runtime: runtime,
          // imdbRating: Number(movie.imdbRating),
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
      userRating: 2,
    };
    this.addWatchedMovie.emit(newWatched);
    this.handleCloseMovie();
  }
}
