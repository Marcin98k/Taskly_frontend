import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { TokenService } from 'src/app/token.service';
import { catchError, first } from 'rxjs/operators';
import { of } from 'rxjs';
import { MainTasklyService } from 'src/app/main-taskly.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  signIn: FormGroup;

  userLog: User = new User();
  authToken: any;

  usernameControl = new FormControl(null, Validators.required);
  passwordControl = new FormControl(null, Validators.required);

  constructor(private mainTasklyService: MainTasklyService,
    private router: Router, private formBuilder: FormBuilder, private token: TokenService) { }

  ngOnInit(): void {
    this.signIn = this.formBuilder.group({
      loginUsername: [''],
      loginPassword: ['']
    });
  }

  ngSubmit() {
    this.signInUser();
  }

  goToMainPage() {
    this.router.navigate(['/tasks']);
  }

  signInUser() {
    this.userLog.username = this.signIn.get('loginUsername')?.value;
    this.userLog.password = this.signIn.get('loginPassword')?.value;
    this.mainTasklyService.signInUser(this.userLog).pipe(
      first(),
      catchError((error: any) => {
        console.log(error);
        return of(null);
      })
    ).subscribe((data: string | null) => {
      if (data) {
        let responseObj = JSON.parse(data);
        let jwtToken = responseObj.jwt;
        this.token.saveTokenToLocal(jwtToken);
        this.token.setToken(jwtToken);
        console.log(jwtToken);
        this.goToMainPage(); 
      } else {
        console.log("NULL Login - > data");
      }
    });
  }
}
