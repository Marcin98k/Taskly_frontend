import { Component, OnInit } from '@angular/core';
import { Task } from '../model/task';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDatepicker } from '@angular/material/datepicker';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';
import { UserProperties } from '../model/user-properties';
import { TokenService } from 'src/app/token.service';
import { MainTasklyService } from 'src/service/main-taskly.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent {

  
  arrow = faAngleDown;

  createTask: FormGroup;

  userProperties: UserProperties = new UserProperties();
  userId: number;

  stateControl = new FormControl(null, Validators.required);
  categoryControl = new FormControl(null, Validators.required);
  priorityControl = new FormControl(null, Validators.required);
  periodOfTimeControl = new FormControl(null, Validators.required);
  typeControl = new FormControl(null, Validators.required);

  disableReminding = new FormControl(false);

  defaultTime = '9:30';

  public picker1: MatDatepicker<Date>;
  public picker2: MatDatepicker<Date>;

  statesEnumsValues: string[] = [];
  prioritiesEnumsValues: string[] = [];
  categoriesEnumsValues: string[] = [];
  periodOfTimeEnumsValues: string[] = [];
  typeEnumsValues: string[] = [];

  statesSelectedValues = new FormControl();
  prioritiesSelectedValues = new FormControl();
  categoriesSelectedValues = new FormControl();
  periodOfTimeSelectedValues = new FormControl();
  typeSelectedValues = new FormControl();

  task: Task = new Task();

  constructor(private mainTasklyService: MainTasklyService,
    private router: Router, private formBuilder: FormBuilder, private tokenService: TokenService) {
    let token = this.tokenService.getToken();
    if (token) {
      this.mainTasklyService.decodeToken(token).subscribe((tokenData: UserProperties) => {
        this.userProperties = tokenData;
        this.userId = this.userProperties.id;
      });
    } else {
      console.error("Token is null");
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    this.getStatesEnums();
    this.getPrioritiesEnums();
    this.getCategoriesEnums();
    this.getTypeEnums();

    this.setValueState();
    this.setValuePriority();
    this.setValueCategory();
    this.setValueType();

    this.createTask = this.formBuilder.group({
      taskName: [''],
      taskNote: [''],
      taskStart: [''],
      taskEnd: [''],
      taskTime: [''],
      taskReminderTime: ['']
    });
  }

  ngSubmit() {
    this.saveTask();
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

  private getTypeEnums() {
    this.mainTasklyService.getTaskTypeList().subscribe(data => {
      this.typeEnumsValues = data;
    })
  }

  private setValueState() {
    this.statesSelectedValues.valueChanges.subscribe(value => {
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

  private setValueType() {
    this.typeSelectedValues.valueChanges.subscribe(value => {
      this.task.type = value;
    })
  }

  goToTaskList() {
    this.router.navigate(['/tasks']);
  }

  saveTask() {
    this.task.name = this.createTask.get('taskName')?.value;
    this.task.note = this.createTask.get('taskNote')?.value;

    const startDate = this.createTask.get('taskStart')?.value;
    const taskHour = this.createTask.get('taskTime')?.value;
    const endDate = this.createTask.get('taskEnd')?.value;

    this.task.startDate = this.mainTasklyService.formatDate(this.convertDate(startDate, taskHour));
    this.task.endDate = this.mainTasklyService.formatDate(this.convertDate(endDate, taskHour));
    this.task.remidnerTime = this.createTask.get('taskReminderTime')?.value;
    this.task.userId = this.userId;

    this.mainTasklyService.saveTask(this.task).subscribe(data => {
      this.goToTaskList();
    });
  }

  convertDate(date: moment.Moment, time: string) {
    let former = date.format('YYYY-MM-DD');
    console.log(former);
    return former + " " + time;
  }
}
