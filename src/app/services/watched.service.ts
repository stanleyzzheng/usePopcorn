import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { watched } from '../watched';
// import { WATCHED } from '../mock-watched';

@Injectable({
  providedIn: 'root',
})
export class WatchedService {
  constructor() {}
  // getWatched(): Observable<watched[]> {
  //   const watched = of(WATCHED);
  //   return watched;
  // }
}
