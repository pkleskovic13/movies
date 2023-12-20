import { Component, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../../../models/movie.model';
import { MoviesService } from '../../../services/movies.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent {
  private route: ActivatedRoute;
  private movieService: MoviesService;

  movie$ = signal<Movie | undefined>(undefined);

  constructor() {
    this.route = inject(ActivatedRoute);
    this.movieService = inject(MoviesService);

    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe(params => {
      const id = Number(params.get('id'));
      
      if (id && !isNaN(id)) {
        console.log('reeee')
        this.movieService.getMovieById(id).subscribe((movie) => {
          console.log(movie);
          this.movie$.update(() => movie);
        });
      }
    });
  }
}
