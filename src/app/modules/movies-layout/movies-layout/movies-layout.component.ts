import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  Signal,
  ViewChildren,
  inject,
  signal,
} from "@angular/core";
import { BreakpointService } from "../../../services/breakpoint.service";
import { MenuService } from "../../../services/menu.service";
import { MoviesService } from "../../../services/movies.service";

@Component({
  selector: "app-movies-layout",
  templateUrl: "./movies-layout.component.html",
  styleUrl: "./movies-layout.component.scss",
})
export class MoviesLayoutComponent implements AfterViewInit {
  @ViewChildren("scrollable") scrollables: QueryList<ElementRef> = new QueryList();

  private breakpointService: BreakpointService;
  private menuService: MenuService;
  private movieService: MoviesService;

  isMobile$ = signal(false);
  isMenuOpen$: Signal<boolean>;

  constructor() {
    this.breakpointService = inject(BreakpointService);
    this.menuService = inject(MenuService);
    this.movieService = inject(MoviesService);

    this.breakpointService.isHandset.subscribe((isHandset) => {
      this.isMobile$.update(() => isHandset);
    });

    this.isMenuOpen$ = this.menuService.isMenuOpen;
  }

  ngAfterViewInit(): void {
    this.scrollables.changes.subscribe((scrollables: QueryList<ElementRef>) => {
      this.addScrollListeners(scrollables);
    });

    // Adding the initial scroll listener to the desktop view (not needed for mobile)
    if (!this.isMobile$()) {
      this.addScrollListeners(this.scrollables);
    }
  }

  addScrollListeners(scrollables: QueryList<ElementRef>) {
    scrollables.forEach((scrollable) => {
      scrollable.nativeElement.addEventListener(
        "scroll",
        this.handleScroll.bind(this)
      );
    });
  }

  handleScroll(event: any) {
    const target = event.target;
    const scrollPos = target.scrollTop + target.clientHeight;

    if (scrollPos === target.scrollHeight) {
      this.movieService.getPopularMovies(true);
    }
  }
}
