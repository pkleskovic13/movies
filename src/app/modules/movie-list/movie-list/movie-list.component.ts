import { Component, inject, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MoviesService } from "../../../services/movies.service";
import { Movie, MovieWithGenres } from "../../../models/movie.model";
import { GenreService } from "../../../services/genre.service";
import { Genre } from "../../../models/genre.model";
import { switchMap } from "rxjs";

@Component({
  selector: "app-movie-list",
  templateUrl: "./movie-list.component.html",
  styleUrl: "./movie-list.component.scss",
})
export class MovieListComponent {
  private moviesService: MoviesService;
  private genreService: GenreService;

  movieList$ = signal<MovieWithGenres[]>([]);
  genreList$ = signal<Genre[]>([]);

  constructor() {
    this.moviesService = inject(MoviesService);
    this.genreService = inject(GenreService);

    this.genreService
      .getAllMovieGenres()
      .pipe(
        takeUntilDestroyed(),
        switchMap((genreList) => {
          this.genreList$.update(() => genreList);
          return this.moviesService.getPopularMovies();
        })
      )
      .subscribe((movieList) => {
        const movieWithMappedGenres: MovieWithGenres[] = movieList.map(movie => {
          return {
            ...movie,
            genres: this.parseGenres(movie.genreIds)
          }
        })
        this.movieList$.update(() => movieWithMappedGenres);

        // Workaround for the default MatSidenav behavior with dynamic content: it does not properly push the content to the side and instead
        // just renders the sidenav over the content until the first DOM refresh
        window.dispatchEvent(new Event("resize"));
      });
  }

  parseGenres(genreIds: number[]): string[] {
    return genreIds?.map(
      (genreId) =>
        this.genreList$().find((genre) => genre.id === genreId)?.name ?? "Unknown genre"
    );
  }
}
