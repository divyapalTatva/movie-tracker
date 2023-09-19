import { Injectable } from '@angular/core';
import { Observable } from '@ckeditor/ckeditor5-utils';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  apiCount: number = 0;
  isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();
  constructor() {}

  showLoader() {
    if (this.apiCount == 0) {
      this.isLoadingSubject.next(true);
    }
    this.apiCount++;
  }

  hideLoader() {
    this.apiCount--;
    if (this.apiCount == 0) {
      this.isLoadingSubject.next(false);
    }
  }
}
