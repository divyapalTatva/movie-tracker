import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Movie } from 'src/app/models';

@Injectable({
  providedIn: 'root',
})
export class MovieDataService {
  constructor() {}

  movies: Movie[] = [];
  search = new Subject<string>();

  updateMovieLocally(id: number, data: Movie) {
    let movies: Movie[] = this.getMoviesFromLocal();
    movies = movies.map((movie) => {
      return movie.id == id ? data : movie;
    });
    this.setMoviesToLocal(movies);
    this.updateData();
  }

  addMovieLocally(data: Movie) {
    let movies: Movie[] = this.getMoviesFromLocal();
    let id;
    movies.length == 0 ? (id = 1) : (id = movies[movies.length - 1].id + 1);
    data.id = id;
    movies.push(data);
    this.setMoviesToLocal(movies);
    this.updateData();
  }

  deleteMovieLocally(id: number) {
    let movies: Movie[] = this.getMoviesFromLocal();
    movies = movies.filter((data) => {
      return data.id == id ? false : true;
    });
    this.setMoviesToLocal(movies);
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

  updateData() {
    this.movies = this.getMoviesFromLocal();
  }
}
