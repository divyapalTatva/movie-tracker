import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';
import { MOVIES } from 'src/app/data/data';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})

export class MovieListComponent implements OnInit,AfterViewInit{

searchedMovies!:Observable<Movie[]>;
@ViewChild(MatPaginator) paginator!: MatPaginator;
dataSource!: MatTableDataSource<any>;

  constructor(private moviesService: MoviesService,private changeDetector:ChangeDetectorRef ,private router:Router) {
  }

  ngOnInit(): void {    
    let movies=this.moviesService.getMoviesFromLocal();
    if(movies==null){
      // this.moviesService.getMovies().subscribe((data)=>{  
      //   this.moviesService.setMoviesToLocal(data);
      //   this.moviesService.movies=data;
      //   this.setDataSource();
      // });
       
        this.moviesService.setMoviesToLocal(MOVIES);
        this.moviesService.movies=MOVIES;
        this.setDataSource();
     
    }
    else{
      this.moviesService.movies=movies;
    }    
  }

  ngAfterViewInit(): void {
    this.setDataSource();
    this.changeDetector.detectChanges();
  }

  setDataSource(){
    this.dataSource=new MatTableDataSource<any>(
      this.moviesService.movies
      );
      this.searchedMovies = this.dataSource.connect();
      this.dataSource.paginator = this.paginator;
      this.moviesService.search.subscribe({next:(data)=>{    
        this.dataSource.filter=data;
      }})
  }
  searchMovie(event:any){
    this.moviesService.search.next(event.target.value.trim());
  }

  deleteMovie(id:number){
    this.dataSource.data=this.dataSource.data.filter((data)=>{return data.id==id? false:true
    });
    this.dataSource._updateChangeSubscription();
    // this.moviesService.deleteMovie(id).subscribe((data)=>{});
    this.moviesService.deleteMovieLocally(id);
  }
}
