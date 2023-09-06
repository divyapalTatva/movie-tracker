import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Editor } from '@ckeditor/ckeditor5-core';
import { ToastrService } from 'ngx-toastr';
import { Genre, Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';

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
    private params: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
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

  getTitleError() {
    if (this.movieForm.get('title')?.hasError('required')) {
      return 'Title is Required';
    }
    return null;
  }

  getBoxOfficeError(field: string) {
    switch (field) {
      case 'budget': {
        if (this.movieForm.get(field)?.hasError('required')) {
          return 'Budget is Required';
        } else if (this.movieForm.get(field)?.hasError('pattern')) {
          return 'Budget is Invalid';
        }
        break;
      }

      case 'grossIndia': {
        if (this.movieForm.get(field)?.hasError('required')) {
          return 'Gross India is required';
        } else if (this.movieForm.get(field)?.hasError('pattern')) {
          return 'Gross India is Invalid';
        }
        break;
      }

      case 'grossWorld': {
        if (this.movieForm.get(field)?.hasError('required')) {
          return 'Gross World is required';
        } else if (this.movieForm.get(field)?.hasError('pattern')) {
          return 'Gross World is Invalid';
        }
        break;
      }

      case 'total': {
        if (this.movieForm.get(field)?.hasError('required')) {
          return 'Total Collection is required';
        } else if (this.movieForm.get(field)?.hasError('pattern')) {
          return 'Total Collection is Invalid';
        }
        break;
      }
    }
    return null;
  }

  getDirectorError() {
    if (this.movieForm.get('director')?.hasError('required')) {
      return 'Director is Required';
    }
    return null;
  }

  getWriterError() {
    if (this.movieForm.get('writer')?.hasError('required')) {
      return 'Writer is Required';
    }
    return null;
  }

  getLeadActorError() {
    if (this.movieForm.get('leadActor')?.hasError('required')) {
      return 'Lead Actor is Required';
    }
    return null;
  }

  getEditorError() {
    if (this.movieForm.get('description')?.hasError('required')) {
      return 'Description is Required';
    } else if (this.movieForm.get('description')?.hasError('minlength')) {
      return 'Minimum 200 characters are required';
    }
    return null;
  }

  onImagePicked(event: any) {
    this.invalidImg = true;
    const file = (event.target as HTMLInputElement)?.files![0];
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

    if(this.id !=0){
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
    this.movie=this.movieService.getMovieDetails(this.id);
    this.imagePath=this.movie.posterUrl;
    this.setMovieForm();
  }

  removeImage() {
    if(this.id !=0){
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
      if(this.id==0){
        // this.movieService.addMovie(movie).subscribe((data) => {});
        this.movieService.addMovieLocally(movie);
        this.toastr.success("Success","Movie Added")
      }
      else{
        // this.movieService.updateMovie(this.id,movie).subscribe((data) => {});
        this.movieService.updateMovieLocally(this.id,movie);
        this.toastr.success("Success","Movie Updated")
      }
      this.movieForm.reset();
      this.router.navigate(['']);
      
    }
  }
}
