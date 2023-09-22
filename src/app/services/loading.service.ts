import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

  constructor() {}

  showLoader() {
    this.isLoadingSubject.next(true);
  }

  hideLoader() {
    this.isLoadingSubject.next(false);
  }
}
