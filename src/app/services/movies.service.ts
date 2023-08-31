import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '../models/movie';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) {

  }
  movies:Movie[]=[];
  search=new Subject<string>();
  
  loadMovies() {
    return this.http.get<Movie[]>('http://localhost:3000/movies');
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
}
