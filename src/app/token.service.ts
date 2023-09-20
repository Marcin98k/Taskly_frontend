import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private token: string | null;

  constructor() {
    this.token = this.getTokenFromLocal();
  }

  setToken(token: string): void {
    this.token = token;
    this.saveTokenToLocal(token);
  }

  getToken(): string | null{
    return this.token;
  }

  saveTokenToLocal(token: string) {
    localStorage.setItem('tokenJWT', token);
  }

  getTokenFromLocal(): string | null {
    return localStorage.getItem('tokenJWT');
  }

  removeTokenFromLocal() {
    localStorage.removeItem('tokenJWT');
  }
}
