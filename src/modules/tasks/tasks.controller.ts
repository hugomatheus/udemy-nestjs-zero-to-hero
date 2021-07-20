import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTaskFilterDto } from 'src/modules/tasks/dto/get-tasks-filters.dto';
import { Task } from './entities/task.entity';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @GetUser() user_id: string) {
    return this.tasksService.create(createTaskDto, user_id);
  }

  @Get()
  findAll(
    @Query() filterDto: GetTaskFilterDto,
    @GetUser() user_id: string,
  ): Promise<Task[]> {
    return this.tasksService.findAll(filterDto, user_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user_id: string) {
    return this.tasksService.findOne(id, user_id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @GetUser() user_id: string,
  ): Promise<Task> {
    return this.tasksService.update(id, updateTaskDto, user_id);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() user_id: string,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateStatus(id, status, user_id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user_id: string): Promise<void> {
    return this.tasksService.remove(id, user_id);
  }
}
