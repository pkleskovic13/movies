import { Component, Signal, inject, signal } from "@angular/core";
import { BreakpointService } from "../../../services/breakpoint.service";
import { MenuService } from "../../../services/menu.service";

@Component({
  selector: "app-movies-layout",
  templateUrl: "./movies-layout.component.html",
  styleUrl: "./movies-layout.component.scss",
})
export class MoviesLayoutComponent {
  private breakpointService: BreakpointService;
  private menuService: MenuService;

  isMobile$ = signal(false);
  isMenuOpen$: Signal<boolean>;

  constructor() {
    this.breakpointService = inject(BreakpointService);
    this.menuService = inject(MenuService);

    this.breakpointService.isHandset.subscribe((isHandset) => {
      this.isMobile$.update(() => isHandset);
    })

    this.isMenuOpen$ = this.menuService.isMenuOpen;
  }

  onScroll(event: any) {
    console.log(event);
  }
}
