import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { MoviesLayoutComponent } from './movies-layout/movies-layout.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { MovieListModule } from '../movie-list/movie-list.module';

@NgModule({
  declarations: [
    MoviesLayoutComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    MovieListModule,
    LayoutModule,
  ]
})
export class MoviesLayoutModule { }
