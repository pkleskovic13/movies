import { HttpClient } from "@angular/common/http";
import { Injectable, inject, signal } from "@angular/core";
import { PaginatedResponse } from "../models/api/paginated-response.model";
import { Movie } from "../models/movie.model";
import { environment } from "../../environments/environment";
import { BehaviorSubject, Observable, map, of } from "rxjs";

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
  private moviesPage$ = signal<number>(1);

  // TODO: Cleanup OnDestroy of active subscriptions in case we have memory leaks
  // TODO: Simple caching?
  constructor() {
    this.httpClient = inject(HttpClient);
  }

  getPopularMovies(isScroll?: boolean): Observable<Movie[]> {
    if (isScroll) {
      this.moviesPage$.update((val) => val + 1);
    }
    this.httpClient.get<PaginatedResponse<Movie>>(
      `${environment.movieDatabaseApi.BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${this.moviesPage$()}&sort_by=popularity.desc`,
      this.options
    ).pipe(
      map(response => response.results),
    ).subscribe(response => {
      this.moviesSubject$.next([...this.moviesSubject$.getValue(), ...response]);
    });

    return this.moviesSubject$;
  }

  getMovieById(id: number): Observable<Movie | undefined> {
    const movie = this.moviesSubject$.getValue().find((movie) => movie.id === id)
    // if (movie) {
      return of(movie);
    // } 

    // TODO: else make a network request to the API (and add to the movies array i guess?)
    console.log('not found, make a request');
  }
}
