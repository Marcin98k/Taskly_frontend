import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  getErrorMessage(field: AbstractControl, errors: string[]): string {
    for (const error of errors) {
      if (field.hasError(error)) {
        switch (error) {
          case 'required':
            return 'Musisz podać wartość';
          case 'email':
            return 'Nepoprawny adres email';
          case 'minlength':
            return 'Musisz podać co najmniej 3 znaki';
          case 'match':
            return 'Hasła są niezgodne';
          default:
            return '';
        }
      }
    }
    return '';
  }
}
