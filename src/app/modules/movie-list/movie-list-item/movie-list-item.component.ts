import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-movie-list-item',
  templateUrl: './movie-list-item.component.html',
  styleUrl: './movie-list-item.component.scss'
})
export class MovieListItemComponent {
  @Input() title?: string;
}
