import { Component, NgZone, inject, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MoviesService } from "../../../services/movies.service";
import { Movie, MovieWithGenres } from "../../../models/movie.model";
import { GenreService } from "../../../services/genre.service";
import { Genre } from "../../../models/genre.model";
import { switchMap } from "rxjs";
import { Router } from "@angular/router";
import { CdkScrollable, ScrollDispatcher } from "@angular/cdk/scrolling";

@Component({
  selector: "app-movie-list",
  templateUrl: "./movie-list.component.html",
  styleUrl: "./movie-list.component.scss",
})
export class MovieListComponent {
  private moviesService: MoviesService;
  private genreService: GenreService;
  private router: Router;
  private ngZone: NgZone;
  private scrollDispatcher: ScrollDispatcher;

  movieList$ = signal<MovieWithGenres[]>([]);
  genreList$ = signal<Genre[]>([]);
  selectedItem$ = signal<number | undefined>(undefined);

  constructor() {
    this.moviesService = inject(MoviesService);
    this.genreService = inject(GenreService);
    this.router = inject(Router);
    this.ngZone = inject(NgZone);
    this.scrollDispatcher = inject(ScrollDispatcher);

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

    this.scrollDispatcher
      .scrolled()
      .pipe(takeUntilDestroyed())
      .subscribe((cdk: CdkScrollable | void) => {
        if (!cdk) {
          return;
        }
        const elementRef = cdk.getElementRef().nativeElement;

        this.ngZone.run(() => {
          const scrollPos = elementRef.scrollTop + elementRef.clientHeight;
          console.log(scrollPos, elementRef.scrollHeight);
          if (scrollPos === elementRef.scrollHeight) {
            console.log("trigger api call");
          }
        });
      });
  }

  setSelectedItem(id: number) {
    this.selectedItem$.update(() => id);
    this.router.navigate([id]);
  }
}
