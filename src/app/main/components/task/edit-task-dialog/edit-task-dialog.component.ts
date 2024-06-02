import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from 'src/app/main/model/task';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})
export class EditTaskDialogComponent {
  constructor(
    private dialogRef: DialogRef,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task }
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }
}
