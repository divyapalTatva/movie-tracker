import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor() {}

  hasError(form: FormGroup, field: string, error: string): boolean {
    return form.get(field)?.hasError(error)!;
  }

  isInvalid(form: FormGroup, field: string){
    return form.get(field)?.invalid && form.get(field)?.touched
  }

  getErrorMessage(form: FormGroup, field: string){
    if(form.get(field)?.hasError('required')){
      return 'field is required'
    }
    else if(form.get(field)?.hasError('pattern')){
      return 'field is invalid'
    }
    else if(form.get(field)?.hasError('minlength')){
      const minlength=form.get(field)?.errors!['minlength']['requiredLength'];
      return 'minimum '+minlength+' characters required';
    }
    else{
      return null
    }
  }

}
