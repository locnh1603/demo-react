import {v4 as uuid} from 'uuid';

export class TaskModel {
  id: string;
  createdDate: Date;
  status: TaskStatus;
  dueDate: Date;
  taskName: string;
  priority: TaskPriority;

  constructor() {
    this.id = uuid();
    this.createdDate = new Date();
    this.status = TaskStatus.Open;
    this.dueDate = new Date();
    this.taskName = '';
    this.priority = TaskPriority.Low;
  }
}

export enum TaskStatus {
  Open = 'Open',
  Completed = 'Completed',
  Pending = 'Pending',
  InProgress = 'In Progress'
}

export enum TaskPriority {
  High = 'High',
  Medium = 'Medium',
  Low = 'Low'
}
