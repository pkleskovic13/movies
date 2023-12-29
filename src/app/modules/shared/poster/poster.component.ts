import { Component, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-poster',
  templateUrl: './poster.component.html',
  styleUrl: './poster.component.scss'
})
export class PosterComponent {
  @Input() path?: string;
  @Input() title?: string;

  getFullPosterPath(path: string): string {
    return environment.movieDatabaseApi.BASE_IMAGE_PATH + path;
  }
}
