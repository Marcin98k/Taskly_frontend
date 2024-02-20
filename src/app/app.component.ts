import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from '@angular/material/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { UserProperties } from './model/user-properties';
import { MainTasklyService } from './services/main-taskly.service';
import { TokenService } from './services/token.service';
import {
  faBriefcase,
  faChevronDown,
  faDashboard,
  faGears,
  faHome,
  faList,
  faPaperPlane,
  faPlus,
  faSignOut
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

export const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY'
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT }
  ]
})
export class AppComponent {
  @ViewChild(MatSidenav)
  sidenav: MatSidenav;

  // Icons
  plusIcon = faPlus;
  listIcon = faList;
  dashboardIcon = faDashboard;
  settingsIcon = faGears;
  signOutIcon = faSignOut;
  homeIcon = faHome;
  workIcon = faBriefcase;
  elseIcon = faPaperPlane;
  arrowDownIcon = faChevronDown;

  token: string | null;

  userProperties: UserProperties;

  constructor(
    private observer: BreakpointObserver,
    private mainTasklyService: MainTasklyService,
    private tokenService: TokenService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {
    this.token = tokenService.getToken();
    if (this.token !== null) {
      this.mainTasklyService.decodeToken(this.token).subscribe((data) => {
        this.userProperties = data;
      });
    }
  }

  ngAfterViewInit() {
    this.observer.observe('(max-width: 800px)').subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
      this.cd.detectChanges();
    });
  }

  isLoggedIn() {
    this.sidenav.mode = 'over';
    return this.tokenService.isLogged();
  }

  signOut() {
    this.tokenService.setToken('');
    this.router.navigate(['/login']);
  }
}
