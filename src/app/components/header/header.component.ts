import { Component, EventEmitter, Output } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() toggleSidebar=new EventEmitter<void>();


  constructor(private movieService:MoviesService){

  }

  searchMovie(event:any){
    this.movieService.search.next(event.target.value.trim());

  }
}
