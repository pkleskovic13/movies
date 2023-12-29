import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { PosterComponent } from './poster/poster.component';
import { GenreListComponent } from './genre-list/genre-list.component';

const COMPONENTS = [
  PosterComponent,
  GenreListComponent,
]

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    MaterialModule,
    ...COMPONENTS,
  ]
})
export class SharedModule { }
