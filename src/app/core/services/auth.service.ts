import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { UserLoginData, UserRegisterData } from 'src/app/main/model/user';
import { UserProperties } from 'src/app/main/model/user-properties';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = environment.apiUrl;
  private signInURL = this.url + '/auth/sign-in';
  private signUpURL = this.url + '/auth/sign-up';
  private tokenURL = this.url + '/auth/token';

  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) {
    if (this.tokenService.getToken()) {
      this.loggedIn.next(true);
    }
  }

  private getHeaders() {
    return new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.tokenService.getToken()
    );
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  signIn(user: UserLoginData): Observable<string> {
    return this.handleAuth(
      user,
      this.signInURL,
      'An error occurred while logging in'
    );
  }

  signUp(user: UserRegisterData): Observable<string> {
    return this.handleAuth(
      user,
      this.signUpURL,
      'An error occurred during registration'
    );
  }

  private handleAuth(
    user: UserLoginData,
    url: string,
    errorMessage: string
  ): Observable<string> {
    return this.httpClient.post(url, user, { responseType: 'text' }).pipe(
      tap((token) => {
        if (!token) {
          throw new Error('Empty token');
        }
        this.loggedIn.next(true);
        this.setToken(token);
        this.goToMainPage();
      }),
      catchError((error) => {
        console.error('Error: ', error);
        return of(errorMessage);
      })
    );
  }

  logout() {
    this.loggedIn.next(false);
    this.removeToken();
    this.goToLoginPage();
  }

  decodeToken(token: string | null): Observable<UserProperties> {
    return this.httpClient.post<UserProperties>(
      `${this.tokenURL}/${token}`,
      null,
      { headers: this.getHeaders() }
    );
  }

  private setToken(token: string) {
    this.tokenService.setToken(token);
  }

  private removeToken() {
    this.tokenService.removeTokenFromLocal();
  }

  private goToMainPage() {
    this.router.navigate(['/home']);
  }

  private goToLoginPage() {
    this.router.navigate(['/sign-in']);
  }
}
