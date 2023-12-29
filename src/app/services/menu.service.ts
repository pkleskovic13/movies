import { Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private isOpen$ = signal<boolean>(false);

  constructor() { }

  toggleMenu(): void {
    this.isOpen$.update((val) => !val);
  }

  get isMenuOpen(): Signal<boolean> {
    return this.isOpen$;
  }
}
