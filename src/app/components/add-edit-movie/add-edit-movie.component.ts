import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Editor } from '@ckeditor/ckeditor5-core';
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

  constructor(private fb: FormBuilder, private movieService: MoviesService) {}

  ngOnInit(): void {
    this.movieService.getGenre().subscribe((data) => (this.genres = data));
    this.movieForm = this.fb.group({
      title: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      description: ['', [Validators.required]],
      director: ['', [Validators.required]],
      writer: ['', [Validators.required]],
      leadActor: ['', [Validators.required]],
      budget: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      grossIndia: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      grossWorld: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      totalCollection: [
        '',
        [Validators.required, Validators.pattern('[0-9]+')],
      ],
    });
  }
  onReady(editor: ClassicEditor): void {
    const element = editor.ui.getEditableElement()!;
    const parent = element.parentElement!;
    parent.insertBefore(editor.ui.view.toolbar.element!, element);
  }

  getTitleError() {
    if (this.movieForm.get("title")?.hasError('required')) {
      return 'Title is Required';
    }
    return null;
  }

  getBoxOfficeError(field: string) {
    switch (field) {
      case 'budget': {
        if (this.movieForm.get(field)?.hasError('required')) {
          return 'Budget is Required';
        }
        else if(this.movieForm.get(field)?.hasError('pattern')){
          return 'Budget is Invalid';
        }
        break;
      }

      case 'grossIndia': {
        if (this.movieForm.get(field)?.hasError('required')) {
          return 'Gross India is required';
        }
        else if(this.movieForm.get(field)?.hasError('pattern')){
          return 'Gross India is Invalid';
        }
        break;
      }

      case 'grossWorld': {
        if (this.movieForm.get(field)?.hasError('required')) {
          return 'Gross World is required';
        }
        else if(this.movieForm.get(field)?.hasError('pattern')){
          return 'Gross World is Invalid';
        }
        break;
      }

      case 'totalCollection': {
        if (this.movieForm.get(field)?.hasError('required')) {
          return 'Total Collection is required';
        }
        else if(this.movieForm.get(field)?.hasError('pattern')){
          return 'Total Collection is Invalid';
        }
        break;
      }

      
    }
  return null
  }
  getDirectorError(){
    if (this.movieForm.get("director")?.hasError('required')) {
      return 'Director is Required';
    }
    return null;
  }

  getWriterError(){
    if (this.movieForm.get("writer")?.hasError('required')) {
      return 'Writer is Required';
    }
    return null;
  }

  getLeadActorError(){
    if (this.movieForm.get("leadActor")?.hasError('required')) {
      return 'Lead Actor is Required';
    }
    return null;
  }

  getEditorError(){
    if (true) {
      return 'Description is Required';
    }
    return null;
  }

  submit(){
    if(this.movieForm.valid){
      let movie:any={
        id: 0,
        title: this.movieForm.get('title')?.value,
        posterUrl: '',
        genre: this.movieForm.get('genre')?.value,
        description: this.movieForm.get('description')?.value,
        director: this.movieForm.get('director')?.value,
        writer: this.movieForm.get('writer')?.value,
        leadActor: this.movieForm.get('leadActor')?.value,
        budget: this.movieForm.get('budget')?.value,
        grossIndia: this.movieForm.get('grossIndia')?.value,
        grossWorld: this.movieForm.get('grossWorld')?.value,
        totalCollection: this.movieForm.get('totalCollection')?.value,
      }
      this.movieService.postMovie(movie).subscribe((data)=>{
      })

      this.movieForm.reset();
    }

  }
}
