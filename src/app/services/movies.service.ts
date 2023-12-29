import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { PaginatedResponse } from "../models/api/paginated-response.model";
import { Movie } from "../models/movie.model";
import { environment } from "../../environments/environment";
import { BehaviorSubject, Observable, map, of, tap } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MoviesService {
  private httpClient: HttpClient;

  // TODO: implement DRY!
  private options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${environment.movieDatabaseApi.API_KEY}`,
    },
  };

  private moviesSubject$: BehaviorSubject<Movie[]> = new BehaviorSubject<Movie[]>([]);

  constructor() {
    this.httpClient = inject(HttpClient);
  }

  getPopularMovies(): Observable<Movie[]> {
    const response = this.httpClient.get<PaginatedResponse<Movie>>(
      `${environment.movieDatabaseApi.BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`,
      this.options
    ).pipe(
      map(response => response.results),
      tap(response => this.moviesSubject$.next(response))
    );

    return response;
  }

  getMovieById(id: number): Observable<Movie | undefined> {
    const movie = this.moviesSubject$.getValue().find((movie) => movie.id === id)
    // if (movie) {
      return of(movie);
    // } 

    // else make a network request to the API (and add to the movies array i guess?)
    console.log('not found, make a request');
  }
}
