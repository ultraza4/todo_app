export interface Task {
  "id": number,
  "title": string,
  "description": string,
  "dueDate": string,
  "completed": boolean
}

export interface TasksStoreState {
  tasks: Task[]
}