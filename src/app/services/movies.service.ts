import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Genre, Movie } from '../models/movie';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) {

  }

  movies:Movie[]=[];
  search=new Subject<string>();

  getMovies() {
    return this.http.get<Movie[]>('http://localhost:3000/movies');
  }

  postMovie(data:Movie){
    return this.http.post('http://localhost:3000/movies',data);
  }

  getGenre(){
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

  getMovieDetails(id:number):Movie{
    this.movies=this.getMoviesFromLocal();
     return this.movies.find(movie=>
       movie.id==id?true:false
    )!
  }

  getMoviesFromLocal(){
    return this.getLocalStorage('movies');
  }

  setMoviesToLocal(data:any){
    this.setLocalStorage('movies',data);
  }

}
