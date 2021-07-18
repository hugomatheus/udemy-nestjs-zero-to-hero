import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.usersService.create(createUserDto);
    return user;
  }
}
