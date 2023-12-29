import { Component, inject, signal } from '@angular/core';
import { BreakpointService } from '../../../services/breakpoint.service';
import { MenuService } from '../../../services/menu.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private breakPointService: BreakpointService;
  private menuService: MenuService;
  
  isMobile$ = signal<boolean>(false);

  constructor() {
    this.breakPointService = inject(BreakpointService);
    this.menuService = inject(MenuService);

    this.breakPointService.isHandset.subscribe((isMobile) => {
      this.isMobile$.update(() => isMobile);
    });
  }

  toggleMenu(): void {
    this.menuService.toggleMenu();
  }
}
