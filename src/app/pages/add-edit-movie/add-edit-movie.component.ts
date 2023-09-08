import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Editor } from '@ckeditor/ckeditor5-core';
import { ToastrService } from 'ngx-toastr';
import { Genre, Movie } from 'src/app/models';
import { MovieDataService } from 'src/app/services/movie-data/movie-data.service';
import { MoviesService } from 'src/app/services/movie/movies.service';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-add-edit-movie',
  templateUrl: './add-edit-movie.component.html',
  styleUrls: ['./add-edit-movie.component.scss'],
})

export class AddEditMovieComponent {
  public Editor = ClassicEditor;
  movieForm!: FormGroup;
  genres: Genre[] = [];
  invalidImg: boolean = false;
  imagePath: string = '';
  id:number=0;
  movie!:Movie;

  constructor(
    private fb: FormBuilder,
    private movieService: MoviesService,
    private dataService:MovieDataService,
    private params: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    public validation:ValidationService,
    
  ) {}

  ngOnInit(): void {
    // this.movieService.getGenre().subscribe((data) => (this.genres = data));
    this.genres= [
      {
        "id": 1,
        "name": "Romance"
      },
      {
        "id": 2,
        "name": "Drama"
      },
      {
        "id": 3,
        "name": "Action"
      },
      {
        "id": 4,
        "name": "Thriller"
      },
      {
        "id": 5,
        "name": "Comedy"
      }];
    this.id = this.params.snapshot.params['id'];
    this.createMovieForm();
  }

  onReady(editor: ClassicEditor): void {
    const element = editor.ui.getEditableElement()!;
    const parent = element.parentElement!;
    parent.insertBefore(editor.ui.view.toolbar.element!, element);
  }
  
  onImagePicked(event: any) {
    this.invalidImg = true;
    const file = (event.target as HTMLInputElement)?.files![0];
  if(file.size>2*1024*1024){
    this.toastr.error("Error","max image size can be 2mb")
    return;
  }
  
    const fileReader = new FileReader();
    fileReader.addEventListener('load', (event) => {
      this.imagePath = event.target?.result as string;
    });
    fileReader.readAsDataURL(file);
  }

  createMovieForm() {
    this.movieForm = this.fb.group({
      title: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(200)]],
      director: ['', [Validators.required]],
      writer: ['', [Validators.required]],
      posterUrl: ['', [Validators.required]],
      leadActor: ['', [Validators.required]],
      budget: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      grossIndia: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      grossWorld: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      total: [
        '',
        [Validators.required, Validators.pattern('[0-9]+')],
      ],
    });

    if(typeof this.id !='undefined'){
      this.movieForm.get('posterUrl')?.setValidators([]);
      this.movieForm.get('posterUrl')?.updateValueAndValidity();
      this.LoadPreviousData()
    }

  }

  setMovieForm() {
this.movieForm.setValue({ title: this.movie.title,
genre:this.movie.genre,
description: this.movie.description,
director: this.movie.director,
writer: this.movie.writer,
posterUrl: "",
leadActor: this.movie.leadActor,
budget: this.movie.budget,
grossIndia:this.movie.grossIndia,
grossWorld: this.movie.grossWorld,
total: this.movie.total
  })
  }

  LoadPreviousData(){
    this.movie=this.dataService.getMovieDetails(this.id);
    this.imagePath=this.movie.posterUrl;
    this.setMovieForm();
  }

  removeImage() {
    if(typeof this.id !='undefined'){
      this.movieForm.get('posterUrl')?.setValidators([Validators.required]);
    }
    this.movieForm.get('posterUrl')?.updateValueAndValidity();
    this.movieForm.get('posterUrl')?.reset();
    this.imagePath = '';
    this.invalidImg=true;
  }

  cancel() {
    this.router.navigate(['']);
    // this.toastr.error("Cancelled","Operation Cancelled")
  }

  submit() {
    this.invalidImg = true;
    if (this.movieForm.valid) {
      let movie: Movie = {
        id: this.id,
        title: this.movieForm.get('title')?.value,
        posterUrl: this.imagePath,
        genre: this.movieForm.get('genre')?.value,
        description: this.movieForm.get('description')?.value,
        director: this.movieForm.get('director')?.value,
        writer: this.movieForm.get('writer')?.value,
        leadActor: this.movieForm.get('leadActor')?.value,
        budget: this.movieForm.get('budget')?.value,
        grossIndia: this.movieForm.get('grossIndia')?.value,
        grossWorld: this.movieForm.get('grossWorld')?.value,
        total: this.movieForm.get('total')?.value,
      };
      if(typeof this.id=='undefined'){
        // this.movieService.addMovie(movie).subscribe((data) => {});
        this.dataService.addMovieLocally(movie);
        this.toastr.success("Success","Movie Added")
      }
      else{
        // this.movieService.updateMovie(this.id,movie).subscribe((data) => {});
        this.dataService.updateMovieLocally(this.id,movie);
        this.toastr.success("Success","Movie Updated")
      }
      this.movieForm.reset();
      this.router.navigate(['']);
      
    }
  }
  
}
