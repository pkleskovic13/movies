import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MoviesService } from '../../../services/movies.service';
import { Movie } from '../../../models/movie.model';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent {
  private moviesService: MoviesService;
  movieList$ = signal<Movie[]>([]);

  constructor () {
    this.moviesService = inject(MoviesService);

    this.moviesService.getPopularMovies().pipe(takeUntilDestroyed()).subscribe((movieList) => {
      this.movieList$.update(() => movieList)
    });
  }
}
