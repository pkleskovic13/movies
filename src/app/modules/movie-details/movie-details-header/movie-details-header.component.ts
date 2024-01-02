import { Component, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Genre } from '../../../models/genre.model';

@Component({
  selector: 'app-movie-details-header',
  templateUrl: './movie-details-header.component.html',
  styleUrl: './movie-details-header.component.scss'
})
export class MovieDetailsHeaderComponent {
  @Input() posterPath?: string;
  @Input() title?: string;
  @Input() releaseYear?: number;
  @Input() overview?: string;     // TODO: Explore default values, I guess something has changed or I am senile
  @Input() genres?: Genre[];
}
