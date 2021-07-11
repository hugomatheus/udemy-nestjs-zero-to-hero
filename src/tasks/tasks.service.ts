import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  public getAllTasks() {
    return this.tasks;
  }

  public getTaskById(id: string) {
    const task = this.tasks.find((task) => task.id === id);
    return task;
  }

  public deleteTask(id: string): void {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    this.tasks.splice(taskIndex, 1);
  }

  public updateTaskStatus(id: string, status: TaskStatus): Task {
    const updateTask = this.getTaskById(id);
    updateTask.status = status;
    this.tasks.map((task) => (task.id === id ? updateTask : task));
    return updateTask;
  }

  public createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
}
