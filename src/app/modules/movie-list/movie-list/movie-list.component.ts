import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
  signal,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MoviesService } from "../../../services/movies.service";
import { MovieWithGenres } from "../../../models/movie.model";
import { GenreService } from "../../../services/genre.service";
import { Genre } from "../../../models/genre.model";
import { Observable, switchMap } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-movie-list",
  templateUrl: "./movie-list.component.html",
  styleUrl: "./movie-list.component.scss",
})
export class MovieListComponent {
  @Input() sidenavScrollEvent?: Observable<Event>;

  private moviesService: MoviesService;
  private genreService: GenreService;
  private router: Router;

  movieList$ = signal<MovieWithGenres[]>([]);
  genreList$ = signal<Genre[]>([]);
  selectedItem$ = signal<number | undefined>(undefined);

  constructor() {
    this.moviesService = inject(MoviesService);
    this.genreService = inject(GenreService);
    this.router = inject(Router);

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
        const movieWithMappedGenres: MovieWithGenres[] = movieList.map(
          (movie) => {
            return {
              ...movie,
              genres: this.genreService.parseGenres(movie.genreIds),
            };
          }
        );
        this.movieList$.update(() => movieWithMappedGenres);

        // Workaround for the default MatSidenav behavior with dynamic content: it does not properly push the content to the side and instead
        // just renders the sidenav over the content until the first DOM refresh
        window.dispatchEvent(new Event("resize"));
      });
    }

  setSelectedItem(id: number) {
    this.selectedItem$.update(() => id);
    this.router.navigate([id]);
  }
}
