export interface Task {
  id: string;
  description: string;
}

export interface TaskContainer {
  tasks: Task[];
  title: string;
}
