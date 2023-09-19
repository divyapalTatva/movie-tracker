import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Genre, Movie } from '../../models/movie';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  getMovies() {
    return this.http.get(`${environment.baseUrl}Movie/GetMovies`);
  }

  getMovieDetails(id: number) {
    console.log('DEtails', id);

    return this.http.get(
      `${environment.baseUrl}Movie/GetMovieDetails?id=${id}`
    );
  }
  searchMovies(searchTerm?: string) {
    return this.http.get(
      `${environment.baseUrl}Movie/GetMovies?searchTerm=${searchTerm}`
    );
  }

  addMovie(movie: Movie) {
    return this.http.post(`${environment.baseUrl}Movie/AddMovie`, movie);
  }

  updateMovie(movie: Movie) {
    return this.http.put(`${environment.baseUrl}Movie/UpdateMovie`, movie);
  }

  deleteMovie(id: number) {
    return this.http.delete(`${environment.baseUrl}Movie/DeleteMovie?id=${id}`);
  }

  getGenre() {
    return this.http.get<Genre[]>('http://localhost:3000/genre');
  }
}
