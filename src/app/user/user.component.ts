import { Component, OnInit } from '@angular/core';
import { UserProperties } from '../model/user-properties';
import { MainTasklyService } from '../services/main-taskly.service';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit{

  userProperties: UserProperties;

  currentTasksVisible: boolean = true;
  finishedTaskVisible: boolean = false;

  icArrowDown = faAngleDown;
  icArrowUp = faAngleUp;

  constructor(private mainTasklyService: MainTasklyService,
    private router: Router, private token: TokenService) {
      this.mainTasklyService.decodeToken(token.getToken()).subscribe(data => {
        this.userProperties = data;
      });
  }

  ngOnInit(): void {
    if(!this.token.isLogged()) {
      this.router.navigate(['/login']);
    }
  }

  showCurrentTasks() {
    this.currentTasksVisible = ! this.currentTasksVisible;
  }

  showFinishedTasks() {
    this.finishedTaskVisible = ! this.finishedTaskVisible;
  }
}
