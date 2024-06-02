import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { TaskService } from 'src/app/core/services/task.service';
import { Task } from 'src/app/main/model/task';
import { DeleteTaskDialogComponent } from '../delete-task-dialog/delete-task-dialog.component';
import { EditTaskDialogComponent } from '../edit-task-dialog/edit-task-dialog.component';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  task!: Task;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(switchMap((params) => this.taskService.getTask(+params['id'])))
      .subscribe({
        next: (task) => {
          task.taskDate = this.taskService.getDateBy(task.taskDate);
          this.task = task;
        }
      });
  }

  openDeleteDialog() {
    this.dialog.open(DeleteTaskDialogComponent, {
      data: {
        task: this.task
      }
    });
  }

  openEditDialog() {
    this.dialog.open(EditTaskDialogComponent, {
      data: {
        task: this.task
      },
      width: '600px',
      maxWidth: '600px'
    });
  }

  previousTask() {
    throw new Error('Method not implemented.');
  }
  nextTask() {
    throw new Error('Method not implemented.');
  }

  finishTask() {
    console.log('Finish');
  }
}
