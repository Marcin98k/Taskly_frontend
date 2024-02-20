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

  getToken(): string | null {
    return this.token;
  }

  isLogged() {
    return this.getTokenFromLocal() !== null && '';
  }

  saveTokenToLocal(token: string) {
    return localStorage.setItem('tokenJWT', token);
  }

  getTokenFromLocal(): string | null {
    return localStorage.getItem('tokenJWT');
  }

  removeTokenFromLocal() {
    return localStorage.removeItem('tokenJWT');
  }
}
