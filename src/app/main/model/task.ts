import { TaskOptions } from './task-options';

export class Task {
  id: number;
  userId: number;

  name: string;
  note: string;
  remidnerTime: string;

  dateAdded: string;
  taskDate: string;

  status: TaskOptions;
  priority: TaskOptions;
  category: TaskOptions;
  period: TaskOptions;
  type: TaskOptions;
}
