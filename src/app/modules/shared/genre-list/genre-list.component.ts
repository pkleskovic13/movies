import { Component, Input } from '@angular/core';
import { Genre } from '../../../models/genre.model';

@Component({
  selector: 'app-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrl: './genre-list.component.scss'
})
export class GenreListComponent {
  @Input() genreList?: Genre[];
}
