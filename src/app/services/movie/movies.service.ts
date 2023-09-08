import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Genre, Movie } from '../../models/movie';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  getMovies() {
    return this.http.get<Movie[]>('http://localhost:3000/movies');
  }

  addMovie(data: Movie) {
    return this.http.post('http://localhost:3000/movies', data);
  }

  updateMovie(id: number, data: Movie) {
    return this.http.put('http://localhost:3000/movies/' + id, data);
  }

  deleteMovie(id: number) {
    return this.http.delete('http://localhost:3000/movies/' + id);
  }

  getGenre() {
    return this.http.get<Genre[]>('http://localhost:3000/genre');
  }
}
