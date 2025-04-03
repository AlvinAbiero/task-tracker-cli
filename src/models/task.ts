// task status enum
export enum TaskStatus {
  TODO = "todo",
  IN_PROGRESS = "in-progress",
  DONE = "done",
}

// Task interface
export interface Task {
  id: number;
  description: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}
