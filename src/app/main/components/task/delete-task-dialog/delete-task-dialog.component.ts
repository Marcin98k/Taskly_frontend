import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/core/services/task.service';
import { Task } from 'src/app/main/model/task';

@Component({
  selector: 'app-delete-task-dialog',
  templateUrl: './delete-task-dialog.component.html',
  styleUrls: ['./delete-task-dialog.component.css']
})
export class DeleteTaskDialogComponent implements OnInit {
  task!: Task;
  errorMessage!: string;

  constructor(
    private dialogRef: MatDialogRef<DeleteTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { task: Task },
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.task = this.data.task;
  }

  onDelete() {
    this.taskService.deleteTask(this.task.id).subscribe({
      next: () => {
        this.dialogRef.close();
        this.router.navigate(['/show-tasks']);
      },
      error: (err) => {
        this.errorMessage = 'Error in dialog' + err;
      }
    });
  }
}
