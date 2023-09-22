import { Component, Input } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  @Input() query?: string;

  constructor(private movieService: MovieService) {}

  search(query: string) {
    this.movieService.searchMovies(query);
  }
}
