import { Component, ViewChild } from '@angular/core';
import { UserLoginData } from 'src/app/main/model/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { AbstractControl, NgForm } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('f') loginForm!: NgForm;

  hide = true;
  errorMessage!: string;

  userData: UserLoginData = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService) {}

  onLogin() {
    this.authService.signIn(this.userData).subscribe({
      next: (value) => {
        this.errorMessage = value;
        this.loginForm.controls['password'].reset();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  showError(error: unknown) {
    console.log('Login error: ', error);
  }

  getErrorMessage(control: AbstractControl): string {
    if (control.errors?.['required']) {
      return 'To pole jest wymagane';
    } else if (control.errors?.['maxlength']) {
      return `Maksymalna liczba znaków to ${control.errors['maxlength'].requiredLength}`;
    } else if (control.errors?.['minlength']) {
      return `Minimalna liczba znaków to ${control.errors['minlength'].requiredLength}`;
    }
    return '';
  }
}
