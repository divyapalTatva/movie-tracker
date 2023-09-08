import { Component, EventEmitter, Output } from '@angular/core';
import { MovieDataService } from 'src/app/services/movie-data/movie-data.service';
import { MoviesService } from 'src/app/services/movie/movies.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() toggleSidebar=new EventEmitter<void>();


  constructor(private movieService:MoviesService,private dataService:MovieDataService){

  }

  searchMovie(event:any){
    this.dataService.search.next(event.target.value.trim());
  }
}
