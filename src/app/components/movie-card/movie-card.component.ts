import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  constructor(){

  }
@Input() movie!:Movie;
@Output() deleteEvent=new EventEmitter<number>()
watchlistIcon:string='add';

toggleWatchList(){
  this.watchlistIcon=='add' ? this.watchlistIcon='done' :this.watchlistIcon='add'
}

deleteMovie(id:number){
  this.deleteEvent.emit(id);
}

}
