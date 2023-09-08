import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models';
import { MovieDataService } from 'src/app/services/movie-data/movie-data.service';
import { MoviesService } from 'src/app/services/movie/movies.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit{
  movie!:Movie;
  id:number=0;
  watchlistIcon:string='add';
  
constructor(private route:ActivatedRoute,private movieService:MoviesService,private dataService:MovieDataService){
}


  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      this.id=params['id'];
      this.movie=this.dataService.getMovieDetails(this.id);
      
    })
    window.scrollTo(0, 0)
  }
  
  toggleWatchList(){

    this.watchlistIcon=='add' ? this.watchlistIcon='done' :this.watchlistIcon='add'
  }
}
