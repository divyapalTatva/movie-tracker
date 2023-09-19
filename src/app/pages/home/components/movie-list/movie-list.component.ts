import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, catchError, debounce, debounceTime } from 'rxjs';
import { Movie } from 'src/app/models';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { MovieDataService } from 'src/app/services/movie-data/movie-data.service';
import { MovieRxjsService } from 'src/app/services/movie-rxjs/movie-rxjs.service';
import { MoviesService } from 'src/app/services/movie/movies.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit, AfterViewInit {
  searchedMovies!: Observable<Movie[]>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<any>;
  movies: Movie[] = [];
  constructor(
    private moviesService: MoviesService,
    private dataService: MovieDataService,
    private changeDetector: ChangeDetectorRef,
    private router: Router,
    private movieRxjs: MovieRxjsService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.dataService.search.pipe(debounceTime(300)).subscribe({
      next: (data) => {
        // this.dataSource.filter = data;
        this.moviesService.searchMovies(data).subscribe((data: any) => {
          this.movies = data.data;
          this.setDataSource();
          this.changeDetector.detectChanges();
        });
      },
    });

    // let movies=this.dataService.getMoviesFromLocal();
    // let movies;
    // this.movieRxjs.movieSubject.subscribe((data) => {
    //   console.log('observer movie-list');
    //   this.movies = data;
    // });
    // if(movies==null){
    //   this.moviesService.getMovies().subscribe((data)=>{
    //     this.moviesService.setMoviesToLocal(data);
    //     this.moviesService.movies=data;
    //     this.setDataSource();
    //   });
    //     this.dataService.setMoviesToLocal(MOVIES);
    //     this.dataService.movies=MOVIES;
    //     this.setDataSource();
    // }
    // else{
    //    this.dataService.movies=movies;
    // }
  }

  ngAfterViewInit(): void {
    this.moviesService.getMovies().subscribe((data: any) => {
      this.movies = data.data;
      console.log(this.movies);
      this.setDataSource();
      this.changeDetector.detectChanges();
    });
  }

  setDataSource() {
    this.dataSource = new MatTableDataSource<any>(this.movies);
    this.searchedMovies = this.dataSource.connect();
    this.dataSource.paginator = this.paginator;
  }

  searchMovie(event: any) {
    this.dataService.search.next(event.target.value.trim());
  }

  deleteMovie(id: number) {
    this.dataSource.data = this.dataSource.data.filter((data) => {
      return data.id == id ? false : true;
    });
    this.dataSource._updateChangeSubscription();
    this.moviesService.deleteMovie(id).subscribe((data) => {});
    // this.dataService.deleteMovieLocally(id);
    // this.movieRxjs.deleteMovie(id);
  }
}
