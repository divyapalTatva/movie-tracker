import { Component } from '@angular/core';
import { MOVIES } from 'src/app/data/data';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent {
movies:Movie[]= MOVIES;
}
