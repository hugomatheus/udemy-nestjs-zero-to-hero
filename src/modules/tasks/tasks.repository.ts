import { GetTaskFilterDto } from 'src/modules/tasks/dto/get-tasks-filters.dto';
import { Brackets, EntityRepository, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Task } from './entities/task.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async findAll(filterDto: GetTaskFilterDto, user_id: string): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');
    query.where({ user_id });

    if (status) {
      query.andWhere('task.status =:status', { status });
    }
    if (search) {
      query.andWhere(
        new Brackets((qb) => {
          qb.where('(title ILIKE :search OR description ILIKE :search)', {
            search: `%${search}%`,
          });
        }),
      );
    }
    const tasks = query.getMany();
    // const tasks = query.innerJoinAndSelect('task.user', 'user').getMany();
    return tasks;
  }
}
