import { FormControl } from '@angular/forms';
import { TaskOptions } from './task-options';

export interface BaseTask {
  name: string;
  taskDate: string;
  status: TaskOptions | string;
  priority: TaskOptions | string;
  category: TaskOptions | string;
  type: TaskOptions | string;
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
  taskDate: FormControl<Date | string>;
  taskTime: FormControl<string>;
  status: FormControl<string>;
  priority: FormControl<string>;
  category: FormControl<string>;
  type: FormControl<string>;
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
