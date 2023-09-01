import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { AddEditMovieComponent } from './components/add-edit-movie/add-edit-movie.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'moviesDetails/:id', component: MovieDetailsComponent },
  { path: 'add-edit-movie', component: AddEditMovieComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
