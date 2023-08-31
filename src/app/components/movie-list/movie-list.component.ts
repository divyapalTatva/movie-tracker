import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})

export class MovieListComponent implements OnInit,AfterViewInit{
displayedMovies:Movie[]=[];
searchedMovies!:Observable<Movie[]>;


@ViewChild(MatPaginator) paginator!: MatPaginator;
dataSource!: MatTableDataSource<any>;

  constructor(private moviesService: MoviesService,private changeDetector:ChangeDetectorRef) {
    this.moviesService.loadMovies().subscribe((data) => {
      this.moviesService.movies=data;
      
      this.displayedMovies=data.slice(0,5);
      this.moviesService.setLocalStorage("movies",data);
    });
  }

  ngOnInit(): void {
    
    this.moviesService.loadMovies().subscribe((data)=>{  
      this.moviesService.movies=data;
      this.dataSource=new MatTableDataSource<any>(
        this.moviesService.movies
        );
        console.log(this.moviesService.movies);
        console.log( this.dataSource);
        this.searchedMovies = this.dataSource.connect();
        this.dataSource.paginator = this.paginator;
    });
    
    this.moviesService.search.subscribe((data)=>{  
       this.dataSource.filter=data;
     })

      
//     this.moviesService.search.subscribe((data)=>{  
//       this.dataSource= this.moviesService.movies.filter((movie)=>{
//        if(movie.title.toLowerCase().includes(data.toLowerCase()) || movie.description.toLowerCase().includes(data.toLowerCase()) || movie.genre.toLowerCase().includes(data.toLowerCase())){
//  return true
//        }
//        return false;
//       })
//       this.paginate({}) 
//      })
    



  }
  ngAfterViewInit(): void {
 
    this.changeDetector.detectChanges();
  }

 

}
