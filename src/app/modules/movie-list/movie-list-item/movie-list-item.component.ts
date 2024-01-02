import { Component, Input } from '@angular/core';
import { Genre } from '../../../models/genre.model';

@Component({
  selector: 'app-movie-list-item',
  templateUrl: './movie-list-item.component.html',
  styleUrl: './movie-list-item.component.scss'
})
export class MovieListItemComponent {
  @Input() id?: number;
  @Input() title?: string;
  @Input() genres?: Genre[];
  @Input() isSelected: boolean = false;

  get renderedTitle(): string | undefined {
    if (this.title?.length && this.title.length > 26) {
      return this.title.slice(0, 26) + '...';
    }

    return this.title;
  }

  get genreList(): string | undefined {
    if (this.genres?.length && this.genres.length > 3) {
      return this.genres?.slice(0, 3).map((genre) => genre.name).join(', ') + `, and ${this.genres.length - 3} more`;
    }
    return this.genres?.map((genre) => genre.name).join(', ');
  }
}
