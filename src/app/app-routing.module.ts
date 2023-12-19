import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './modules/core/layout/layout.component';
import { MovieDetailsModule } from './modules/movie-details/movie-details.module';
import { MovieDetailsComponent } from './modules/movie-details/movie-details/movie-details.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent, children: [
      { path: '', component: MovieDetailsComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
