import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieListComponent } from './movie-list/movie-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    MovieListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    MovieListComponent,
  ]
})
export class MovieListModule { }
