import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/core/services/task.service';
import { TokenService } from 'src/app/core/services/token.service';
import { Task } from 'src/app/main/model/task';

@Component({
  selector: 'app-show-task',
  templateUrl: './show-task.component.html',
  styleUrls: ['./show-task.component.css']
})
export class ShowTaskComponent implements OnInit {
  task: Task[] = [];

  constructor(
    private taskService: TaskService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.getUserTasks();
  }

  private getUserTasks() {
    try {
      const userId = this.tokenService.getUserId();
      this.taskService.getUserTask(userId).subscribe({
        next: (task) => {
          this.task = task;
        },
        error: (error) => {
          console.error('Error fetching user tasks', error);
        }
      });
    } catch (error) {
      console.error('Error getting user ID', error);
    }
  }
}
