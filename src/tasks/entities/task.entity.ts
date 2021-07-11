import { Column, Entity, PrimaryColumn } from 'typeorm';
import { TaskStatus } from '../task-status.enum';
import { v4 as uuid } from 'uuid';
@Entity('tasks')
export class Task {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
