import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';
import { MOVIES } from 'src/app/data/data';
import { Movie } from 'src/app/models';
import { MovieDataService } from 'src/app/services/movie-data/movie-data.service';
import { MoviesService } from 'src/app/services/movie/movies.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})

export class MovieListComponent implements OnInit,AfterViewInit{

searchedMovies!:Observable<Movie[]>;
@ViewChild(MatPaginator) paginator!: MatPaginator;
dataSource!: MatTableDataSource<any>;

  constructor(private moviesService: MoviesService,private dataService:MovieDataService,private changeDetector:ChangeDetectorRef ,private router:Router) {
  }

  ngOnInit(): void {    
    let movies=this.dataService.getMoviesFromLocal();
    if(movies==null){
      // this.moviesService.getMovies().subscribe((data)=>{  
      //   this.moviesService.setMoviesToLocal(data);
      //   this.moviesService.movies=data;
      //   this.setDataSource();
      // });
       
        this.dataService.setMoviesToLocal(MOVIES);
        this.dataService.movies=MOVIES;
        this.setDataSource();
     
    }
    else{
      this.dataService.movies=movies;
    }    
  }

  ngAfterViewInit(): void {
    this.setDataSource();
    this.changeDetector.detectChanges();
  }

  setDataSource(){
    this.dataSource=new MatTableDataSource<any>(
      this.dataService.movies
      );
      this.searchedMovies = this.dataSource.connect();
      this.dataSource.paginator = this.paginator;
      this.dataService.search.subscribe({next:(data)=>{    
        this.dataSource.filter=data;
      }})
  }
  searchMovie(event:any){
    this.dataService.search.next(event.target.value.trim());
  }

  deleteMovie(id:number){
    this.dataSource.data=this.dataSource.data.filter((data)=>{return data.id==id? false:true
    });
    this.dataSource._updateChangeSubscription();
    // this.moviesService.deleteMovie(id).subscribe((data)=>{});
    this.dataService.deleteMovieLocally(id);
  }
}
