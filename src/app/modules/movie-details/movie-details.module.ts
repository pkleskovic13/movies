import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieDetailsHeaderComponent } from './movie-details-header/movie-details-header.component';
import { SharedModule } from '../shared/shared.module';
import { EmptyStateComponent } from './empty-state/empty-state.component';

@NgModule({
  declarations: [
    MovieDetailsComponent,
    MovieDetailsHeaderComponent,
    EmptyStateComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    MovieDetailsComponent,
  ]
})
export class MovieDetailsModule { }
