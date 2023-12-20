import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Genre } from '../../../models/genre.model';

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
}
