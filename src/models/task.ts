import type { TaskType } from "./enums";

export class Task {
    id: number;
    name: string;
    description: string;
    taskType: TaskType;

    constructor(id:number, name: string, description: string, taskType: TaskType) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.taskType = taskType;
    }
  }
  