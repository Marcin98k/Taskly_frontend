import { Component } from '@angular/core';
import { Task } from '../../model/task';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatDatepicker } from '@angular/material/datepicker';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';
import { UserProperties } from '../../model/user-properties';
import { TokenService } from 'src/app/core/services/token.service';
import { MainTasklyService } from 'src/app/core/services/main-taskly.service';
import { TaskOptions } from '../../model/task-options';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent {
  arrow = faAngleDown;
  defaultTime = '9:30';

  userProperties: UserProperties = new UserProperties();
  task: Task = new Task();

  userId: number;

  createTask: FormGroup;

  stateControl = new FormControl(null, Validators.required);
  categoryControl = new FormControl(null, Validators.required);
  priorityControl = new FormControl(null, Validators.required);
  periodOfTimeControl = new FormControl(null, Validators.required);
  typeControl = new FormControl(null, Validators.required);
  disableReminding = new FormControl(false);

  public picker1: MatDatepicker<Date>;
  public picker2: MatDatepicker<Date>;

  statesSelectedValues = new FormControl();
  prioritiesSelectedValues = new FormControl();
  categoriesSelectedValues = new FormControl();
  periodOfTimeSelectedValues = new FormControl();
  typeSelectedValues = new FormControl();

  statusValues: TaskOptions[] = [];
  priorityValues: TaskOptions[] = [];
  categoryValues: TaskOptions[] = [];
  typeValues: TaskOptions[] = [];

  constructor(
    private mainTasklyService: MainTasklyService,
    private router: Router,
    private formBuilder: FormBuilder,
    private tokenService: TokenService
  ) {
    this.mainTasklyService
      .decodeToken(this.tokenService.getToken())
      .subscribe((tokenData: UserProperties) => {
        this.userProperties = tokenData;
        this.userId = this.userProperties.id;
      });
  }

  // ngOnInit(): void {
  //   this.getStatus();
  //   this.getPriority();
  //   this.getCategory();
  //   this.getType();

  //   this.setStatus();
  //   this.setPriority();
  //   this.setCategory();
  //   this.setType();

  //   this.createTask = this.formBuilder.group({
  //     taskName: [''],
  //     taskNote: [''],
  //     taskStart: [''],
  //     taskEnd: [''],
  //     taskTime: [''],
  //     taskReminderTime: ['']
  //   });
  // }

  ngSubmit() {
    this.saveTask();
  }

  private getStatus() {
    this.mainTasklyService.getStatusList().subscribe((data) => {
      console.log(data);
      this.statusValues = data;
    });
  }

  private getPriority() {
    this.mainTasklyService.getPriorityList().subscribe((data) => {
      this.priorityValues = data;
    });
  }

  private getCategory() {
    this.mainTasklyService.getCategoryList().subscribe((data) => {
      this.categoryValues = data;
    });
  }

  private getType() {
    this.mainTasklyService.getTypeList().subscribe((data) => {
      this.typeValues = data;
    });
  }

  private setStatus() {
    this.statesSelectedValues.valueChanges.subscribe((value) => {
      this.task.status = value;
    });
  }

  private setPriority() {
    this.prioritiesSelectedValues.valueChanges.subscribe((value) => {
      this.task.priority = value;
    });
  }

  private setCategory() {
    this.categoriesSelectedValues.valueChanges.subscribe((value) => {
      this.task.category = value;
    });
  }

  private setType() {
    this.typeSelectedValues.valueChanges.subscribe((value) => {
      this.task.type = value;
    });
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

    console.log(
      this.mainTasklyService.formatDate(this.convertDate(startDate, taskHour))
    );
    console.log(
      this.mainTasklyService.formatDate(this.convertDate(endDate, taskHour))
    );
    this.task.dateAdded = this.mainTasklyService.formatDate(
      this.convertDate(startDate, taskHour)
    );
    this.task.taskDate = this.mainTasklyService.formatDate(
      this.convertDate(endDate, taskHour)
    );
    this.task.remidnerTime = this.createTask.get('taskReminderTime')?.value;
    this.task.userId = this.userId;

    this.mainTasklyService.saveTask(this.task).subscribe(() => {
      this.goToTaskList();
    });
  }

  convertDate(date: moment.Moment, time: string) {
    const former = date.format('YYYY-MM-DD');
    console.log(former);
    return former + ' ' + time;
  }
}
