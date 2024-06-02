import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observer } from 'rxjs';
import { FormService } from 'src/app/core/services/form.service';
import { TaskService } from 'src/app/core/services/task.service';
import { TokenService } from 'src/app/core/services/token.service';
import { PostTask, PostTaskForm, Task } from 'src/app/main/model/task';
import { TaskOptions } from 'src/app/main/model/task-options';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup<PostTaskForm>;
  taskData!: Task;
  errorMessage = '';
  @Input() editMode = false;
  @Input() task!: Task;
  @Output() closeDialog = new EventEmitter<void>();
  observer: Observer<unknown> = {
    next: () => {
      if (this.editMode) {
        this.emitCloseDialog();
      }
      this.errorMessage = '';
      this.router.navigate(['/show-task']);
    },
    error: (err) => {
      this.errorMessage = 'Wystąpił błąd.' + err;
    },
    complete: () => {
      console.log();
    }
  };

  statusValues: TaskOptions[] = [];
  priorityValues: TaskOptions[] = [];
  categoryValues: TaskOptions[] = [];
  typeValues: TaskOptions[] = [];

  constructor(
    private formService: FormService,
    private taskService: TaskService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  get controls() {
    return this.taskForm.controls;
  }

  emitCloseDialog() {
    this.closeDialog.emit();
  }

  ngOnInit(): void {
    this.getStatusOptions();
    this.getPriorityOptions();
    this.getCategoryOptions();
    this.getTypeOptions();
    this.initForm();
  }

  private initForm() {
    let newTaskDate;
    if (this.editMode) {
      const taskDate = this.task.taskDate;
      newTaskDate = this.getDate(taskDate);
    } else {
      newTaskDate = new Date();
    }

    this.taskForm = new FormGroup<PostTaskForm>({
      name: new FormControl(this.editMode ? this.task.name : '', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)
        ]
      }),
      taskDate: new FormControl(this.editMode ? newTaskDate : new Date(), {
        nonNullable: true,
        validators: [Validators.required]
      }),
      taskTime: new FormControl(
        this.editMode ? this.getTimeString(newTaskDate) : '',
        {
          nonNullable: true,
          validators: [Validators.required]
        }
      ),
      status: new FormControl(this.editMode ? this.task.status.name : '', {
        nonNullable: true
      }),
      priority: new FormControl(this.editMode ? this.task.priority.name : '', {
        nonNullable: true
      }),
      category: new FormControl(this.editMode ? this.task.category.name : '', {
        nonNullable: true
      }),
      type: new FormControl(this.editMode ? this.task.type.name : '', {
        nonNullable: true
      }),
      note: new FormControl(this.editMode ? this.task.note : '', {
        nonNullable: true,
        validators: [Validators.maxLength(500)]
      })
    });
  }

  private getDate(date: string): Date {
    const lastDate = this.taskService.getDateBy(date);
    const myNewDate = new Date(lastDate);
    // myNewDate.setMonth(myNewDate.getMonth() - 1);
    return myNewDate;
  }

  private getTimeString(date: Date): string {
    return date.toTimeString().split('T')[0].substring(0, 5);
  }

  getErrorMessage(control: FormControl) {
    return this.formService.getErrorMessage(control);
  }

  onAddTask() {
    const currentDateTime = new Date().toISOString();
    const taskValues = this.taskForm.getRawValue();

    const statusOption = this.convertOptionNameToObject(
      taskValues.status,
      this.statusValues
    );

    const priorityOption = this.convertOptionNameToObject(
      taskValues.priority,
      this.priorityValues
    );

    const categoryOption = this.convertOptionNameToObject(
      taskValues.category,
      this.categoryValues
    );

    const typeOption = this.convertOptionNameToObject(
      taskValues.type,
      this.typeValues
    );

    const postTask: PostTask = {
      name: taskValues.name,
      taskDate: this.taskService.formatDateAndHourToString(
        new Date().toISOString(),
        taskValues.taskTime
      ),
      status: taskValues.status,
      priority: taskValues.priority,
      category: taskValues.category,
      type: taskValues.type,
      note: taskValues.note,
      userId: this.tokenService.getUserId(),
      dateAdded: this.taskService.formatDateToString(currentDateTime)
    };

    if (this.editMode) {
      console.log('editMode == true');
      console.log(postTask);
      console.log(this.task.id);
      this.taskService.patchTask(this.task.id, postTask).subscribe((data) => {
        console.log('editMode == true');
        console.log(data);
      });
    } else {
      console.log('editMode == false');
      console.log(postTask);
      this.taskService.addTask(postTask).subscribe((data) => {
        console.log('editMode == false');
        console.log(data);
      });
    }
  }

  private convertOptionNameToObject(
    selectedOption: string | TaskOptions,
    optionsArray: TaskOptions[]
  ): TaskOptions {
    let statusObject = optionsArray.find(
      (option) => option.name === selectedOption
    );
    if (typeof statusObject === 'undefined') {
      statusObject = new TaskOptions('', '');
    }
    return statusObject;
  }

  getStatusOptions() {
    this.taskService.getStatusOptions().subscribe((statusOptions) => {
      this.statusValues = statusOptions;
    });
  }

  getPriorityOptions() {
    this.taskService.getPriorityOptions().subscribe((priorityOptions) => {
      this.priorityValues = priorityOptions;
    });
  }

  getCategoryOptions() {
    this.taskService.getCategoryOptions().subscribe((categoryOptions) => {
      this.categoryValues = categoryOptions;
    });
  }

  getTypeOptions() {
    this.taskService.getTypeOptions().subscribe((typeOptions) => {
      this.typeValues = typeOptions;
    });
  }
}
