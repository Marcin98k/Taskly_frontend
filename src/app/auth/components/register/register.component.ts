import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/core/services/token.service';
import { MainTasklyService } from 'src/app/core/services/main-taskly.service';
import { UserLoginData } from 'src/app/main/model/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide = true;

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(128)
    ]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    terms: new FormControl('', [Validators.required])
  });

  get controls() {
    return this.registerForm.controls;
  }

  signUp: FormGroup;
  userReg: UserLoginData;
  authToken: object;

  constructor(
    private router: Router,
    private mainTasklyService: MainTasklyService,
    private token: TokenService
  ) {}

  ngOnInit(): void {
    console.log('');
  }

  getErrorMessage() {
    if (
      this.controls.email.hasError('required') ||
      this.controls.username.hasError('required') ||
      this.controls.password.hasError('required') ||
      this.controls.confirmPassword.hasError('required')
    ) {
      return 'You must enter a value';
    }

    return this.controls.email.hasError('email') ? 'Not a valid email' : '';
  }

  onRegister() {
    console.log(this.registerForm.value);
  }

  goToMainPage() {
    this.router.navigate(['/tasks']);
  }

  signUpUser() {
    // if (this.signUp.get('registerPassword')?.value === '') {
    //   return;
    // }
    // if (
    //   this.signUp.get('registerPassword')?.value ===
    //   this.signUp.get('registerConfirmPassword')?.value
    // ) {
    //   this.userReg.username = this.signUp.get('registerUsername')?.value;
    //   this.userReg.password = this.signUp.get('registerPassword')?.value;
    //   concat(
    //     this.mainTasklyService.signUpUser(this.userReg),
    //     this.mainTasklyService.signInUser(this.userReg).pipe(
    //       first(),
    //       catchError((error: any) => {
    //         console.log(error);
    //         return of(null);
    //       }),
    //       tap((data: string | null) => {
    //         if (data) {
    //           const responseObj = JSON.parse(data);
    //           const jwtToken = responseObj.jwt;
    //           this.token.setToken(jwtToken);
    //           this.goToMainPage();
    //         }
    //       })
    //     )
    //   ).subscribe();
    // }
  }
}
