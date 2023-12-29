import { Component, OnInit, computed, inject, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ActivatedRoute } from "@angular/router";
import { Movie, MovieWithGenres } from "../../../models/movie.model";
import { MoviesService } from "../../../services/movies.service";
import { environment } from "../../../../environments/environment";
import { GenreService } from "../../../services/genre.service";
import { filter, map } from "rxjs";

@Component({
  selector: "app-movie-details",
  templateUrl: "./movie-details.component.html",
  styleUrl: "./movie-details.component.scss",
})
export class MovieDetailsComponent {
  private route: ActivatedRoute;
  private movieService: MoviesService;
  private genreService: GenreService;

  movie$ = signal<MovieWithGenres | undefined>(undefined);
  backdropPath$ = computed(() => this.movie$()?.backdropPath);

  constructor() {
    this.route = inject(ActivatedRoute);
    this.movieService = inject(MoviesService);
    this.genreService = inject(GenreService);

    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      const id = Number(params.get("id"));

      if (id && !isNaN(id)) {
        this.movieService
          .getMovieById(id)
          .pipe(
            map((movie) => {
              if (movie) {
                const movieWithGenres: MovieWithGenres = {
                  ...movie,
                  genres: this.genreService.parseGenres(movie?.genreIds ?? []),
                };
                return movieWithGenres;
              }
              return movie;
            })
          )
          .subscribe((movie) => {
            this.movie$.update(() => movie);
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
