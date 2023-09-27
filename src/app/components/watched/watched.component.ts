import {
  Component,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { WatchedService } from 'src/app/services/watched.service';
import { watched } from 'src/app/watched';

@Component({
  selector: 'app-watched',
  templateUrl: './watched.component.html',
  styleUrls: ['./watched.component.scss'],
})
export class WatchedComponent {
  @Input() watchedMovies: watched[] = [];

  @Output() removeWatchedMovie = new EventEmitter();

  avgImdbRating: number = 0;
  avgUserRating: number = 0;
  avgRuntime: number = 0;

  calculateAverages(): void {
    this.avgImdbRating = this.average(
      this.watchedMovies.map((movie) => movie.imdbRating)
    );

    this.avgUserRating = this.average(
      this.watchedMovies.map((movie) => movie.userRating)
    );
    this.avgRuntime = this.average(
      this.watchedMovies.map((movie) => movie.runtime)
    );
  }
  ngOnChanges(changes: SimpleChanges) {
    // Detect changes to the watchedMovies input
    if (changes['watchedMovies'] && this.watchedMovies.length > 0) {
      this.calculateAverages();
    }
    console.log(this.watchedMovies);
  }
  average(arr: any[]) {
    if (arr.length === 0) {
      return 0; // Handle the case when the array is empty
    }
    return arr
      .reduce((acc, cur, i, arr) => acc + cur / arr.length, 0)
      .toFixed(2);

    // const sum = arr.reduce((acc, cur) => acc + cur, 0);
    // return sum / arr.length;
  }

  handleDelete(movie: watched) {
    this.removeWatchedMovie.emit(movie);
  }
  constructor() {}
}
