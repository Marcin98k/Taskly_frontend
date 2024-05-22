import { Injectable } from '@angular/core';
import { JwtPayload, jwtDecode } from 'jwt-decode';

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

  getUserId(): number {
    if (this.token && this.token !== '') {
      try {
        const temp = jwtDecode<MyTokenPayload>(this.token);

        return temp.id;
      } catch (error) {
        throw new Error('Error decoding token');
      }
    } else {
      throw new Error('Token is not provided');
    }
  }

  removeTokenFromLocal() {
    return localStorage.removeItem('tokenJWT');
  }
}

interface MyTokenPayload extends JwtPayload {
  id: number;
}
