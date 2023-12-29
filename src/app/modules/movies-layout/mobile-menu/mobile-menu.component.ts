import { Component, inject } from '@angular/core';
import { MenuService } from '../../../services/menu.service';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.scss'
})
export class MobileMenuComponent {
  private menuService: MenuService;

  constructor() {
    this.menuService = inject(MenuService);
  }

  toggleMenu(): void {
    this.menuService.toggleMenu();
  }
}
