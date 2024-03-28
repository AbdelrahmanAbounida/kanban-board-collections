export interface Task {
  id: string;
  description: string;
}

export interface TaskContainer {
  tasks: Task[];
  name: string;
}
