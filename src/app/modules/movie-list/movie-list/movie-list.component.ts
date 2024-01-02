import {
  Component,
  Input,
  inject,
  signal,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MoviesService } from "../../../services/movies.service";
import { Genre } from "../../../models/genre.model";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { Movie } from "../../../models/movie.model";
import { BreakpointService } from "../../../services/breakpoint.service";
import { MenuService } from "../../../services/menu.service";

@Component({
  selector: "app-movie-list",
  templateUrl: "./movie-list.component.html",
  styleUrl: "./movie-list.component.scss",
})
export class MovieListComponent {
  @Input() sidenavScrollEvent?: Observable<Event>;

  private moviesService: MoviesService;
  private breakpointService: BreakpointService;
  private menuService: MenuService;
  private router: Router;

  movieList$ = signal<Movie[]>([]);
  genreList$ = signal<Genre[]>([]);
  selectedItem$ = signal<number | undefined>(undefined);
  isHandset$ = signal<boolean>(false);

  constructor() {
    this.moviesService = inject(MoviesService);
    this.breakpointService = inject(BreakpointService);
    this.menuService = inject(MenuService);
    this.router = inject(Router);

    this.breakpointService.isHandset.pipe(
      takeUntilDestroyed()
    ).subscribe((isHandset) => {
      this.isHandset$.update(() => isHandset);
    })

    this.moviesService.getPopularMovies()
      .pipe(
        takeUntilDestroyed(),
      )
      .subscribe((movieList) => {
        this.movieList$.update(() => movieList);

        // Workaround for the default MatSidenav behavior with dynamic content: it does not properly push the content to the side and instead
        // just renders the sidenav over the content until the first DOM refresh
        window.dispatchEvent(new Event("resize"));
      });
    }

  setSelectedItem(id: number) {
    if (this.isHandset$()) {
      this.menuService.toggleMenu();
    }

    this.selectedItem$.update(() => id);
    this.router.navigate([id]);
  }
}
