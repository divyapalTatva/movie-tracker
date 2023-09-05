import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Genre, Movie } from '../models/movie';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  movies: Movie[] = [];
  search = new Subject<string>();

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

  updateMovieLocally(id: number, data: Movie) {
    let movies: Movie[] = this.getMoviesFromLocal();
    movies = movies.map((movie) => {
      return data.id == id ? data : movie;
    });
    this.setMoviesToLocal(movies);
  }

  addMovieLocally(data: Movie) {
    let movies: Movie[] = this.getMoviesFromLocal();
    let id = movies[movies.length - 1].id + 1;
    data.id = id;
    movies.push(data);
    this.setMoviesToLocal(movies);
  }

  deleteMovieLocally(id: number) {
    let movies: Movie[] = this.getMoviesFromLocal();
    movies = movies.filter((data) => {
      return data.id == id ? false : true;
    });
    this.setMoviesToLocal(movies);
  }

  getGenre() {
    return this.http.get<Genre[]>('http://localhost:3000/genre');
  }

  setLocalStorage(key: string, value: any) {
    let val = JSON.stringify(value);
    localStorage.setItem(key, val);
  }

  getLocalStorage(key: string) {
    let data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }

  getMovieDetails(id: number): Movie {
    this.movies = this.getMoviesFromLocal();
    return this.movies.find((movie) => (movie.id == id ? true : false))!;
  }

  getMoviesFromLocal() {
    return this.getLocalStorage('movies');
  }

  setMoviesToLocal(data: any) {
    this.setLocalStorage('movies', data);
  }
}
