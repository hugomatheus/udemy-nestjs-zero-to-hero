import { IsEnum } from 'class-validator';
import { TaskStatus } from '../tasks.model';

export class updateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
