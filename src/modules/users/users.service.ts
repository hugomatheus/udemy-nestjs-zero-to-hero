import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { name, cpf, email, password } = createUserDto;
      const passwordHash = await hash(password, 8);
      const user = this.usersRepository.create({
        name,
        cpf,
        email,
        password: passwordHash,
      });

      await this.usersRepository.save(user);
      return user;
    } catch (error) {
      throw new HttpException(
        { message: error.message, detail: error.detail },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
