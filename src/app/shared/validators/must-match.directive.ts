import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  NG_VALIDATORS,
  ValidationErrors,
  Validator
} from '@angular/forms';

@Directive({
  selector: '[appMustMatch]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: MustMatchDirective, multi: true }
  ]
})
export class MustMatchDirective implements Validator {
  @Input('appMustMatch') MustMatch: string[] = [];

  validate(formGroup: AbstractControl): ValidationErrors | null {
    const control = (formGroup as FormGroup).controls[this.MustMatch[0]];
    const matchingControl = (formGroup as FormGroup).controls[
      this.MustMatch[1]
    ];

    if (!control || !matchingControl) {
      return null;
    }

    if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
      return null;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ ['mustMatch']: true });
    } else {
      matchingControl.setErrors(null);
    }

    return null;
  }
}
