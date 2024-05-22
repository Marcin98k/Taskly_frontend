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
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  taskForm!: FormGroup<PostTaskForm>;
  taskData!: Task;
  errorMessage = '';
  @Input() editMode = false;
  @Input() task!: Task;
  @Output() closeDialog = new EventEmitter<void>();
  observer: Observer<unknown> = {
    next: () => {
      this.errorMessage = '';
      if (this.editMode) {
        this.emitCloseDialog();
      }
      this.router.navigate(['/see-task']);
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
    this.taskForm = new FormGroup<PostTaskForm>({
      name: new FormControl(this.editMode ? this.task.name : '', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)
        ]
      }),
      taskDate: new FormControl(this.editMode ? this.task.taskDate : '', {
        nonNullable: true,
        validators: [Validators.required]
      }),

      status: new FormControl(this.editMode ? this.task.status : '', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      priority: new FormControl(this.editMode ? this.task.priority : '', {
        nonNullable: true
      }),
      category: new FormControl(this.editMode ? this.task.category : '', {
        nonNullable: true
      }),
      type: new FormControl(this.editMode ? this.task.type : '', {
        nonNullable: true
      }),
      note: new FormControl(this.editMode ? this.task.note : '', {
        nonNullable: true,
        validators: [Validators.maxLength(500)]
      })
    });
  }

  getErrorMessage(control: FormControl) {
    return this.formService.getErrorMessage(control);
  }

  onAddTask() {
    const currentDateTime = new Date().toISOString();
    const taskValues = this.taskForm.getRawValue();

    const statusOption = this.convertOptionNameToObject(taskValues.status);
    console.log('---------------------');
    console.log(statusOption);

    const priorityOption = this.convertOptionNameToObject(taskValues.priority);
    console.log('---------------------');
    console.log(priorityOption);

    const categoryOption = this.convertOptionNameToObject(taskValues.category);
    console.log('---------------------');
    console.log(categoryOption);

    const typeOption = this.convertOptionNameToObject(taskValues.type);
    console.log('---------------------');
    console.log(typeOption);

    const postTask: PostTask = {
      name: taskValues.name,
      taskDate: this.taskService.formatDate(taskValues.taskDate),
      status: statusOption,
      priority: priorityOption,
      category: categoryOption,
      type: typeOption,
      note: taskValues.note,
      userId: this.tokenService.getUserId(),
      dateAdded: this.taskService.formatDate(currentDateTime)
    };

    console.log(postTask);

    this.taskService.addTask(postTask).subscribe((data) => {
      console.log(data);
    });
  }

  private convertOptionNameToObject(
    selectedOption: string | TaskOptions
  ): TaskOptions {
    let statusObject = this.statusValues.find(
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
