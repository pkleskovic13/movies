import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { PaginatedResponse } from "../models/api/paginated-response.model";
import { Movie } from "../models/movie.model";
import { environment } from "../../environments/environment";
import { Observable, map } from "rxjs";

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

  constructor() {
    this.httpClient = inject(HttpClient);
  }

  getPopularMovies(): Observable<Movie[]> {
    const response = this.httpClient.get<PaginatedResponse<Movie>>(
      `${environment.movieDatabaseApi.BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`,
      this.options
    ).pipe(map(response => response.results));

    return response;
  }
}
