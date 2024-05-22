import { FormControl } from '@angular/forms';
import { TaskOptions } from './task-options';

export interface BaseTask {
  name: string;
  taskDate: string;
  status: TaskOptions;
  priority: TaskOptions;
  category: TaskOptions;
  type: TaskOptions;
  note: string;
}
export interface TaskResponse extends BaseTask {
  id: number;
  userId: number;
  dateAdded: string;
}

export type PostTaskResponse = TaskResponse;

export type PostTask = Omit<TaskResponse, 'id'>;

export interface PostTaskForm {
  name: FormControl<string>;
  taskDate: FormControl<string>;
  status: FormControl<string | TaskOptions>;
  priority: FormControl<string | TaskOptions>;
  category: FormControl<string | TaskOptions>;
  type: FormControl<string | TaskOptions>;
  note: FormControl<string>;
}

export class Task implements TaskResponse {
  constructor(
    public id: number,
    public userId: number,
    public name: string,
    public dateAdded: string,
    public taskDate: string,
    public status: TaskOptions,
    public priority: TaskOptions,
    public category: TaskOptions,
    public type: TaskOptions,
    public note: string
  ) {}
}
