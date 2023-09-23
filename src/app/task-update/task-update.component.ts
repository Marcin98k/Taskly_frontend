import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { TokenService } from 'src/app/services/token.service';
import { User } from '../model/user';
import { Task } from '../model/task';
import { MainTasklyService } from 'src/app/services/main-taskly.service';

@Component({
  selector: 'app-task-update',
  templateUrl: './task-update.component.html',
  styleUrls: ['./task-update.component.css']
})
export class TaskUpdateComponent {

  
  id: number;
  userId: number;
  
  statesEnumsValues: string[] = [];
  prioritiesEnumsValues: string[] = [];
  categoriesEnumsValues: string[] = [];

  statesSelectedValues = new FormControl();
  prioritiesSelectedValues = new FormControl();
  categoriesSelectedValues = new FormControl();
  
  task: Task = new Task();

  constructor (private mainTasklyService: MainTasklyService,
    private route: ActivatedRoute,
    private router: Router,
    private tokenService: TokenService) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.mainTasklyService.getTaskById(this.id).subscribe(data => {
      this.task = data;
      this.statesSelectedValues.setValue(this.task.state);
      this.prioritiesSelectedValues.setValue(this.task.priority);
      this.categoriesSelectedValues.setValue(this.task.category);
    });

    this.getStatesEnums();
    this.getPrioritiesEnums();
    this.getCategoriesEnums();
    this.setValueState();
    this.setValuePriority();
    this.setValueCategory();
  }

  ngSubmit() {
    this.task.startDate = this.mainTasklyService.formatDate(this.task.startDate);
    this.task.endDate = this.mainTasklyService.formatDate(this.task.endDate);
    this.mainTasklyService.updateTask(this.id, this.task).subscribe(data => {
      this.gotToTaskList();
    });
  }

  private gotToTaskList() {
    this.router.navigate(['/tasks']);
  }

  private getStatesEnums() {
    this.mainTasklyService.getStatesList().subscribe(data => {
      this.statesEnumsValues = data;
    });
  }

  private getPrioritiesEnums() {
    this.mainTasklyService.getTaskPrioritiesList().subscribe(data => {
      this.prioritiesEnumsValues = data;
    });
  }

  private getCategoriesEnums() {
    this.mainTasklyService.getTaskCategoriesList().subscribe(data => {
      this.categoriesEnumsValues = data;
    });
  }

  private setValueState() {
    this.statesSelectedValues.valueChanges.subscribe(value => {
      console.log(typeof(value));
      console.log(typeof(this.task.state));
      this.task.state = value;
    });
  }

  private setValuePriority() {
    this.prioritiesSelectedValues.valueChanges.subscribe(value => {
      this.task.priority = value;
    });
  }

  private setValueCategory() {
    this.categoriesSelectedValues.valueChanges.subscribe(value => {
      this.task.category = value;
    });
  }
}
