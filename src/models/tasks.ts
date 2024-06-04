export interface Task {
  "id": string,
  "title": string,
  "description": string,
  "dueDate": string,
  "completed": boolean
}

export interface TasksStoreState {
  tasks: Task[]
}

export interface TaskStoreActions {
  getTasks(): Promise<void>;
  getTasksByName(taskName: string): Promise<void>;
  getTaskById(id: string): Promise<Task | null>;
  createTask(task: Task): Promise<void>;
  updateTask(updatedTask: Task): Promise<void>;
  deleteTask(id: string): Promise<void>;
  filterTasksById(id: string): void;
}