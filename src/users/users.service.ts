import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { name, cpf, email, password } = createUserDto;
    const user = this.usersRepository.create({
      name,
      cpf,
      email,
      password,
    });

    await this.usersRepository.save(user);
    return user;
  }
}
