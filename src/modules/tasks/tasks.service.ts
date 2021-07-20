import { Injectable, NotFoundException } from '@nestjs/common';
import { GetTaskFilterDto } from 'src/modules/tasks/dto/get-tasks-filters.dto';
import { UpdateResult } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { TaskStatus } from './task-status.enum';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}

  async create(createTaskDto: CreateTaskDto, user_id: string): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.tasksRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user_id,
    });
    await this.tasksRepository.save(task);
    return task;
  }

  findAll(filterDto: GetTaskFilterDto, user_id: string): Promise<Task[]> {
    return this.tasksRepository.findAll(filterDto, user_id);
  }

  async findOne(id: string, user_id: string): Promise<Task> {
    const task = await this.tasksRepository.findOne({ user_id, id });
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
    user_id: string,
  ): Promise<Task> {
    await this.findOne(id, user_id);
    await this.tasksRepository.update(id, updateTaskDto);
    const task = await this.findOne(id, user_id);
    return task;
  }

  async updateStatus(
    id: string,
    status: TaskStatus,
    user_id: string,
  ): Promise<Task> {
    const task = await this.findOne(id, user_id);
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }

  async remove(id: string, user_id: string): Promise<void> {
    await this.findOne(id, user_id);
    const result = await this.tasksRepository.softDelete({ id, user_id });
    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }
}
