import { HttpClient } from "@angular/common/http";
import { Injectable, inject, signal } from "@angular/core";
import { PaginatedResponse } from "../models/api/paginated-response.model";
import { Movie } from "../models/movie.model";
import { environment } from "../../environments/environment";
import { BehaviorSubject, Observable, map, of, switchMap } from "rxjs";
import { GenreService } from "./genre.service";
import { Genre } from "../models/genre.model";

@Injectable({
  providedIn: "root",
})
export class MoviesService {
  private httpClient: HttpClient;
  private genreService: GenreService;

  // TODO: implement DRY!
  private options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${environment.movieDatabaseApi.API_KEY}`,
    },
  };

  private moviesSubject$: BehaviorSubject<Movie[]> =
    new BehaviorSubject<Movie[]>([]);
  private moviesPage$ = signal<number>(1);
  genreList$ = signal<Genre[]>([]);

  // TODO: Cleanup OnDestroy of active subscriptions in case we have memory leaks
  // TODO: Simple caching?
  constructor() {
    this.httpClient = inject(HttpClient);
    this.genreService = inject(GenreService);
  }

  getPopularMovies(isScroll?: boolean): Observable<Movie[]> {
    if (isScroll) {
      this.moviesPage$.update((val) => val + 1);
    }
    this.genreService
      .getAllMovieGenres()
      .pipe(
        switchMap((genreList) => {
          this.genreList$.update(() => genreList);
          return this.httpClient.get<PaginatedResponse<Movie>>(
            `${
              environment.movieDatabaseApi.BASE_URL
            }/discover/movie?include_adult=false&include_video=false&language=en-US&page=${this.moviesPage$()}&sort_by=popularity.desc`,
            this.options
          );
        })
      )
      .subscribe(({ results }) => {
        const moviesWithMappedGenres: Movie[] = results.map(
          (movie) => {
            return {
              ...movie,
              genres: this.parseGenres(movie.genreIds) ?? [],
            };
          }
        );
        this.moviesSubject$.next([
          ...this.moviesSubject$.getValue(),
          ...moviesWithMappedGenres,
        ]);

        // Workaround for the default MatSidenav behavior with dynamic content: it does not properly push the content to the side and instead
        // just renders the sidenav over the content until the first DOM refresh
        window.dispatchEvent(new Event("resize"));
      });

    return this.moviesSubject$;
  }

  getMovieById(id: number): Observable<Movie | undefined> {
    const movie = this.moviesSubject$
      .getValue()
      .find((movie) => movie.id === id);
    if (movie) {
      return of(movie);
    }

    return this.genreService
      .getAllMovieGenres()
      .pipe(
        switchMap((genreList) => {
          this.genreList$.update(() => genreList);
          return this.httpClient.get<Movie>(
            `${environment.movieDatabaseApi.BASE_URL}/movie/${id}`,
            this.options
          );
        })
      )
      .pipe(
        map((movie) => {
          return movie
        })
      );
  }

  private parseGenres(genreIds?: number[]): Genre[] | undefined {
    if (!genreIds) {
      return;
    }
    return genreIds?.map(
      (genreId) =>
        this.genreList$().find((genre) => genre.id === genreId) ?? {
          id: 0,
          name: "Unknown genre",
        }
    );
  }
}
