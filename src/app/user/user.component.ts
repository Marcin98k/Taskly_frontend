import { Component } from '@angular/core';
import { UserProperties } from '../model/user-properties';
import { MainTasklyService } from '../services/main-taskly.service';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import {
  faAngleDown,
  faAngleUp,
  faCheckDouble,
  faListCheck,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';
import { Task } from '../model/task';
import { concatMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  userProperties: UserProperties;
  userId: number;
  username: string;
  role: string;

  allTasks: Task[];
  currentTasks: Task[];
  finishedTasks: Task[];

  allTask: number;
  completedTask: number;
  activeTask: number;

  currentTasksVisible = true;
  finishedTaskVisible = false;

  // Icons
  icArrowDown = faAngleDown;
  icArrowUp = faAngleUp;
  icInProgress = faSpinner;
  icCompleted = faCheckDouble;
  icTaskList = faListCheck;

  constructor(
    private mainTasklyService: MainTasklyService,
    private router: Router,
    private tokenService: TokenService
  ) {
    this.mainTasklyService
      .decodeToken(this.tokenService.getToken())
      .pipe(
        concatMap((tokenData: UserProperties) => {
          this.userProperties = tokenData;
          this.userId = this.userProperties.id;
          this.username = this.userProperties.username;
          this.role = this.userProperties.role;
          return forkJoin({
            finished: this.mainTasklyService.getCompletedTask(
              this.userProperties.id
            ),
            current: this.mainTasklyService.getCurrentTask(
              this.userProperties.id
            ),
            all: this.mainTasklyService.getAllTaskCount(this.userProperties.id),
            completed: this.mainTasklyService.getCompletedTaskCount(
              this.userProperties.id
            ),
            active: this.mainTasklyService.getActiveTaskCount(
              this.userProperties.id
            )
          });
        })
      )
      .subscribe(({ current, finished, all, completed, active }) => {
        this.currentTasks = current;
        this.finishedTasks = finished;
        this.allTask = all;
        this.completedTask = completed;
        this.activeTask = active;
      });
  }

  showCurrentTasks() {
    this.currentTasksVisible = !this.currentTasksVisible;
  }

  showFinishedTasks() {
    this.finishedTaskVisible = !this.finishedTaskVisible;
  }
}
