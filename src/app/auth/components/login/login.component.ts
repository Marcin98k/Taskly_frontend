import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserLoginData } from 'src/app/main/model/user';
import { TokenService } from 'src/app/core/services/token.service';
import { catchError, first } from 'rxjs/operators';
import { of } from 'rxjs';
import { MainTasklyService } from 'src/app/core/services/main-taskly.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;
  signIn: FormGroup;

  userLog: UserLoginData;
  authToken: unknown;

  usernameControl = new FormControl(null, Validators.required);
  passwordControl = new FormControl(null, Validators.required);

  userData: UserLoginData = {
    username: '',
    password: ''
  };

  constructor(
    private mainTasklyService: MainTasklyService,
    private router: Router,
    private formBuilder: FormBuilder,
    private token: TokenService
  ) {}

  // ngOnInit(): void {
  //   this.signIn = this.formBuilder.group({
  //     loginUsername: [''],
  //     loginPassword: ['']
  //   });
  // }

  // ngSubmit() {
  //   this.signInUser();
  // }

  onLogin() {
    console.log(this.userData);
  }

  goToMainPage() {
    this.router.navigate(['/user']);
  }

  signInUser() {
    this.userLog.username = this.signIn.get('loginUsername')?.value;
    this.userLog.password = this.signIn.get('loginPassword')?.value;
    this.mainTasklyService
      .signInUser(this.userLog)
      .pipe(
        first(),
        catchError((error: unknown) => {
          console.log(error);
          return of(null);
        })
      )
      .subscribe((data: string | null) => {
        if (data) {
          const responseObj = JSON.parse(data);
          const jwtToken = responseObj.jwt;
          this.token.saveTokenToLocal(jwtToken);
          this.token.setToken(jwtToken);
          this.goToMainPage();
        } else {
          console.log('NULL Login - > data');
        }
      });
  }
}
