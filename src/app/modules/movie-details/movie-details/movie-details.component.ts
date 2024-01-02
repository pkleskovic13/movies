import { Component, OnInit, computed, inject, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ActivatedRoute } from "@angular/router";
import { Movie } from "../../../models/movie.model";
import { MoviesService } from "../../../services/movies.service";
import { environment } from "../../../../environments/environment";
import { ApiError } from "../../../models/api/api-error.model";

@Component({
  selector: "app-movie-details",
  templateUrl: "./movie-details.component.html",
  styleUrl: "./movie-details.component.scss",
})
export class MovieDetailsComponent {
  private route: ActivatedRoute;
  private movieService: MoviesService;

  movie$ = signal<Movie | undefined>(undefined);
  backdropPath$ = computed(() => this.movie$()?.backdropPath);
  selectedId$ = signal<number | undefined>(undefined);
  error$ = signal<ApiError | undefined>(undefined);

  constructor() {
    this.route = inject(ActivatedRoute);
    this.movieService = inject(MoviesService);

    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      this.selectedId$.update(() => Number(params.get("id")));

      const id = this.selectedId$();

      if (id && !isNaN(id)) {
        this.movieService.getMovieById(id).subscribe({
          next: (movie) => {
            this.movie$.update(() => movie);
            this.error$.update(() => undefined);
          },
          error: (error) => {
            console.error(this.movieService.mapMovieError(error.status));
            this.error$.update(() => this.movieService.mapMovieError(error.status));
          }
        });
      }
    });
  }

  getMovieReleaseYear(releaseDate: string | undefined): number | undefined {
    if (releaseDate) {
      const date = new Date(releaseDate);
      return date.getFullYear();
    }

    return undefined;
  }

  getFullBackdropPath(path: string | undefined): string {
    return environment.movieDatabaseApi.BASE_IMAGE_PATH + path;
  }
}
