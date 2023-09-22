import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Movie } from 'src/app/movie';
import { MovieService } from 'src/app/services/movie.service';
// import { MOVIES } from 'src/app/mock-movies';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  movies?: Observable<Movie[] | null>;
  isLoading: Observable<boolean> = of(false);

  constructor(private movieService: MovieService) {
    // this.movieService.movieData$.subscribe((data) => {
    //   this.movies = data || [];
    // });
  }
  selectMovie(movie: Movie) {
    // this.movieService.selected;
    this.movieService.getMovieDetails(movie.imdbID);
  }
  ngOnInit() {
    // this.movieService.isLoadingMovies$.subscribe(
    //   (isLoading) => (this.isLoading = isLoading)
    // );
    this.movies = this.movieService.movieData$;
    this.isLoading = this.movieService.isLoadingMovies$;
  }

  // getMovies() {
  //   this.movieService.getMovies().subscribe((movies) => (this.movies = movies));
  // }
  // ngOnInit(): void {
  //   this.getMovies();
  // }
}
