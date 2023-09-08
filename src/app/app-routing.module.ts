import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { AddEditMovieComponent } from './pages/add-edit-movie/add-edit-movie.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'details/:id', component: MovieDetailsComponent },
  { path: 'add', component: AddEditMovieComponent },
  { path: 'edit/:id', component: AddEditMovieComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
