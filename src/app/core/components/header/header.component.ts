import { Component, OnDestroy, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  logo = 'assets/images/tasklyLogo.png';

  token!: string | null;
  isLogged = false;
  sub!: Subscription;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.token = this.tokenService.getToken();

    this.sub = this.authService.isLoggedIn.subscribe({
      next: (value) => {
        this.isLogged = value;
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }
}
