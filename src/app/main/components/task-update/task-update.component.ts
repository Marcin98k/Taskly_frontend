import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Task } from '../../model/task';
import { MainTasklyService } from 'src/app/core/services/main-taskly.service';
import { TaskOptions } from '../../model/task-options';

@Component({
  selector: 'app-task-update',
  templateUrl: './task-update.component.html',
  styleUrls: ['./task-update.component.css']
})
export class TaskUpdateComponent {
  id: number;
  // userId: number;

  nameName = 'Name:';
  userIdName = 'User id:';
  startDateName = 'Start date:';
  endDateName = 'End date:';
  stateName = 'State:';
  priorityName = 'Priority:';
  categoryName = 'Category:';
  noteName = 'Note:';

  statusValues: TaskOptions[] = [];
  prioritiesValues: TaskOptions[] = [];
  categoriesValues: TaskOptions[] = [];

  statusSelectedValues = new FormControl();
  prioritiesSelectedValues = new FormControl();
  categoriesSelectedValues = new FormControl();

  task: Task = new Task();

  constructor(
    private mainTasklyService: MainTasklyService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // ngOnInit(): void {
  //   this.id = this.route.snapshot.params['id'];

  //   this.mainTasklyService.getTaskById(this.id).subscribe((data) => {
  //     this.task = data;
  //     this.statusSelectedValues.setValue(this.task.status);
  //     this.prioritiesSelectedValues.setValue(this.task.priority);
  //     this.categoriesSelectedValues.setValue(this.task.category);
  //   });

  //   this.getStatus();
  //   this.getPriorities();
  //   this.getCategories();
  //   this.setValueStatus();
  //   this.setValuePriority();
  //   this.setValueCategory();
  // }

  ngSubmit() {
    this.task.dateAdded = this.mainTasklyService.formatDate(
      this.task.dateAdded
    );
    this.task.taskDate = this.mainTasklyService.formatDate(this.task.taskDate);
    this.mainTasklyService.updateTask(this.id, this.task).subscribe(() => {
      this.gotToTaskList();
    });
  }

  private gotToTaskList() {
    this.router.navigate(['/tasks']);
  }

  private getStatus() {
    this.mainTasklyService.getStatusList().subscribe((data) => {
      this.statusValues = data;
    });
  }

  private getPriorities() {
    this.mainTasklyService.getPriorityList().subscribe((data) => {
      this.prioritiesValues = data;
    });
  }

  private getCategories() {
    this.mainTasklyService.getCategoryList().subscribe((data) => {
      this.categoriesValues = data;
    });
  }

  private setValueStatus() {
    this.statusSelectedValues.valueChanges.subscribe((value) => {
      this.task.status = value;
    });
  }

  private setValuePriority() {
    this.prioritiesSelectedValues.valueChanges.subscribe((value) => {
      this.task.priority = value;
    });
  }

  private setValueCategory() {
    this.categoriesSelectedValues.valueChanges.subscribe((value) => {
      this.task.category = value;
    });
  }
}
