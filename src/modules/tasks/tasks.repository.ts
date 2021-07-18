import { GetTaskFilterDto } from 'src/modules/tasks/dto/get-tasks-filters.dto';
import { Brackets, EntityRepository, Repository } from 'typeorm';
import { Task } from './entities/task.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async findAll(filterDto: GetTaskFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');
    if (status) {
      query.andWhere('task.status =:status', { status });
    }
    if (search) {
      query.andWhere(
        new Brackets((qb) => {
          qb.where('title ILIKE :search OR description ILIKE :search', {
            search: `%${search}%`,
          });
        }),
      );
    }
    const tasks = query.getMany();
    return tasks;
  }
}
