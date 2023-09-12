import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MOVIES } from '../../data/data';
import { Movie } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class MovieRxjsService {
  movieSubject = new BehaviorSubject(MOVIES);
  constructor() { }

  addMovie(movie:Movie){
    let id=this.generateId();
    movie.id=id;
    this.movieSubject.next(this.movieSubject.getValue().concat([movie]));
  }

  updateMovie(movie:Movie){
    console.log(this.movieSubject.getValue());
let tempData:Movie[]=this.movieSubject.getValue();
tempData=tempData.map((data)=>{
  return data.id==movie.id?movie:data
});
this.movieSubject.next(tempData)
  }

  deleteMovie(id:number){
    console.log(this.movieSubject.getValue());
    
    let tempData:Movie[]=this.movieSubject.getValue();
    tempData=tempData.filter((data)=>{
      return data.id==id?false:true
    });
    this.movieSubject.next(tempData)
  }

  getMovieDetails(id:number){
return this.movieSubject.getValue().find((data)=>{
  return data.id==id?true:false;
})
  }

  generateId(){
    let tempData:Movie[]=this.movieSubject.getValue();
    return tempData[tempData.length-1].id+1
  }
  
}
