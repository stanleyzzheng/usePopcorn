import { Component } from '@angular/core';
import { WatchedService } from 'src/app/services/watched.service';
import { watched } from 'src/app/watched';

@Component({
  selector: 'app-watched',
  templateUrl: './watched.component.html',
  styleUrls: ['./watched.component.scss'],
})
export class WatchedComponent {
  watched: watched[] = [];
  avgImdbRating = this.average(this.watched.map((movie) => movie.imdbRating));
  avgUserRating = this.average(this.watched.map((movie) => movie.userRating));
  avgRuntime = this.average(this.watched.map((movie) => movie.runtime));
  constructor(private watchedService: WatchedService) {}
  average(arr: any[]) {
    return arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
  }

  getWatched(): void {
    this.watchedService
      .getWatched()
      .subscribe((watched) => (this.watched = watched));
  }
  ngOnInit() {
    this.getWatched();
  }
}
