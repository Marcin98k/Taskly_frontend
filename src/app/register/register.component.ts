import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { TokenService } from 'src/app/services/token.service';
import { catchError, first, tap } from 'rxjs/operators';
import { concat, of } from 'rxjs';
import { MainTasklyService } from 'src/app/services/main-taskly.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  
  signUp: FormGroup;
  userReg: User = new User();
  authToken: Object;

  usernameControl = new FormControl(null, Validators.required);
  passwordControl = new FormControl(null, Validators.required);
  confirmPasswordControl = new FormControl(null, Validators.required);

  constructor(private router: Router, private formBuilder: FormBuilder,
    private mainTasklyService: MainTasklyService, private token: TokenService) { }

  ngOnInit(): void {
    this.signUp = this.formBuilder.group({
      registerUsername: [''],
      registerPassword: [''],
      registerConfirmPassword: ['']
    });
  }

  ngSubmit() {
    this.signUpUser();
  }

  goToMainPage() {
    this.router.navigate(['/tasks']);
  }

  signUpUser() {

    if (this.signUp.get('registerPassword')?.value === '') {
      return;
    }

    if (this.signUp.get('registerPassword')?.value === this.signUp.get('registerConfirmPassword')?.value) {
      this.userReg.username = this.signUp.get('registerUsername')?.value;
      this.userReg.password = this.signUp.get('registerPassword')?.value;
      concat(
        this.mainTasklyService.signUpUser(this.userReg),
        this.mainTasklyService.signInUser(this.userReg).pipe(
          first(),
          catchError((error: any) => {
            console.log(error);
            return of(null);
          }),
          tap((data: string | null) => {
            if (data) {
              let responseObj = JSON.parse(data);
              let jwtToken = responseObj.jwt;
              this.token.setToken(jwtToken);
              this.goToMainPage();
            }
          })
        )
      ).subscribe();
    }
  }
}
