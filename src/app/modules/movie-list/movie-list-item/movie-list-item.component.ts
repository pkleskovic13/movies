import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-movie-list-item',
  templateUrl: './movie-list-item.component.html',
  styleUrl: './movie-list-item.component.scss'
})
export class MovieListItemComponent {
  @Input() id?: number;
  @Input() title?: string;
  @Input() genres?: string[];
  @Input() isSelected: boolean = false;

  get renderedTitle(): string | undefined {
    if (this.title?.length && this.title.length > 26) {
      return this.title.slice(0, 26) + '...';
    }

    return this.title;
  }
}
