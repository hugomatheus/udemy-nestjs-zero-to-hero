import { Injectable, NotFoundException } from '@nestjs/common';
import { GetTaskFilterDto } from 'src/tasks/dto/get-tasks-filters.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { TaskStatus } from './task-status.enum';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.tasksRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });
    await this.tasksRepository.save(task);
    return task;
  }

  findAll(filterDto: GetTaskFilterDto): Promise<Task[]> {
    return this.tasksRepository.findAll(filterDto);
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOne(id);
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  async updateStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.findOne(id);
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }

  async remove(id: string): Promise<void> {
    const task = await this.findOne(id);
    const result = await this.tasksRepository.delete(task.id);
    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }
}
