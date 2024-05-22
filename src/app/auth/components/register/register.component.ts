import { Component, ViewChild } from '@angular/core';
import { AbstractControl, NgForm } from '@angular/forms';
import { UserRegisterData } from 'src/app/main/model/user';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @ViewChild('f') form!: NgForm;

  hide = true;

  userData: UserRegisterData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    whenJoin: new Date(),
    isActive: false,
    lastVisit: new Date()
  };

  constructor(private authService: AuthService) {}

  onRegister() {
    const password = this.userData.password;
    const confirmPassword = this.userData.confirmPassword;

    if (!password || password !== confirmPassword) {
      this.form.controls['confirmPassword'].setErrors({ mustMatch: true });
      console.log('RegisterError');
    } else {
      this.userData.whenJoin = new Date();
      this.userData.lastVisit = new Date();

      this.authService.signUp(this.userData).subscribe({
        next(value) {
          console.log(value);
        },
        error: (err) => {
          this.showError(err);
        }
      });
    }
  }

  showError(error: unknown) {
    console.log('Registration error: ', error);
  }

  getErrorMessage(control: AbstractControl): string {
    if (control.errors?.['required']) {
      return 'To pole jest wymagane';
    } else if (control.errors?.['appfirstletter']) {
      return 'Pierwszy znak musi być literą';
    } else if (control.errors?.['minlength']) {
      return `Minimalna liczba znaków to ${control.errors['minlength'].requiredLength}`;
    } else if (control.errors?.['maxlength']) {
      return `Maksymalna liczba znaków to ${control.errors['maxlength'].requiredLength}`;
    } else if (control.errors?.['mustMatch']) {
      return 'Hasła się nie zgadzają';
    }
    return '';
  }
}
