import { Injectable, inject } from "@angular/core";
import { BehaviorSubject, Observable, map } from "rxjs";
import { Genre } from "../models/genre.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { GenresResponse } from "../models/api/genres-response.model";

@Injectable({
  providedIn: "root",
})
export class GenreService {
  private httpClient: HttpClient;
  // TODO: implement DRY!
  private options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${environment.movieDatabaseApi.API_KEY}`,
    },
  };

  private genresSubject: BehaviorSubject<Genre[]> = new BehaviorSubject<
    Genre[]
  >([]);

  constructor() {
    this.httpClient = inject(HttpClient);
  }

  getAllMovieGenres(): Observable<Genre[]> {
    if (this.genresSubject.getValue().length > 0) {
      return this.genresSubject.asObservable();
    }

    const response = this.httpClient
      .get<GenresResponse>(
        `${environment.movieDatabaseApi.BASE_URL}/genre/movie/list?language=en`,
        this.options
      )
      .pipe(map((response) => response.genres));

    return response;
  }
}
