import { TestBed } from '@angular/core/testing';

import { MovieRxjsService } from './movie-rxjs.service';

describe('MovieRxjsService', () => {
  let service: MovieRxjsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieRxjsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
