import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieListComponent } from './movie-list/movie-list.component';
import { SharedModule } from '../shared/shared.module';
import { MovieListItemComponent } from './movie-list-item/movie-list-item.component';

@NgModule({
  declarations: [
    MovieListComponent,
    MovieListItemComponent
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
