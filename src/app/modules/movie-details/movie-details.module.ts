import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieDetailsHeaderComponent } from './movie-details-header/movie-details-header.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    MovieDetailsComponent,
    MovieDetailsHeaderComponent,
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
