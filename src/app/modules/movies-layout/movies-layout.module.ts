import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { MoviesLayoutComponent } from './movies-layout/movies-layout.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { MovieListModule } from '../movie-list/movie-list.module';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';

@NgModule({
  declarations: [
    MoviesLayoutComponent,
    MobileMenuComponent
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
