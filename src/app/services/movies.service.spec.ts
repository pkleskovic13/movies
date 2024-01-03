import { TestBed } from '@angular/core/testing';

import { MoviesService } from './movies.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    })
    service = TestBed.inject(MoviesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
