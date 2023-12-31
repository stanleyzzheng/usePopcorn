import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesComponent } from './components/movies/movies.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { WatchedComponent } from './components/watched/watched.component';

import { HttpClientModule } from '@angular/common/http';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { LoaderComponent } from './components/loader/loader.component';
import { BoxComponent } from './components/box/box.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { StarComponent } from './components/star/star.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    DashboardComponent,
    WatchedComponent,
    MovieDetailComponent,
    LoaderComponent,
    BoxComponent,
    StarRatingComponent,
    StarComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
