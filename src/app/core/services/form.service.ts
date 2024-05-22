import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  // getErrorMessage(control: FormControl) {
  //   if (control.errors?.['required']) {
  //     return 'To pole jest wymagane';
  //   } else if (control.errors?.['appfirstletter']) {
  //     return 'Pierwszy znak musi być literą';
  //   } else if (control.errors?.['minlength']) {
  //     return `Minimalna liczba znaków to ${control.errors['minlength'].requiredLength}`;
  //   } else if (control.errors?.['maxlength']) {
  //     return `Maksymalna liczba znaków to ${control.errors['maxlength'].requiredLength}`;
  //   } else if (control.errors?.['mustMatch']) {
  //     return 'Hasła się nie zgadzają';
  //   }
  //   return '';
  // }

  getErrorMessage(control: FormControl) {
    if (control.hasError('required')) {
      return 'To pole jest wymagane';
    } else if (control.hasError('appfirstletter')) {
      return 'Pierwszy znak musi być literą';
    } else if (control.hasError('minlength')) {
      return `Minimalna liczba znaków to ?`;
    } else if (control.hasError('maxlength')) {
      return `Maksymalna liczba znaków to ?`;
    } else if (control.hasError('mustMatch')) {
      return 'Hasła się nie zgadzają';
    }
    return '';
  }
}
