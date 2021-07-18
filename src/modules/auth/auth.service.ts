import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { User } from 'src/modules/users/entities/user.entity';
import { UsersRepository } from 'src/modules/users/users.repository';
import { UsersService } from 'src/modules/users/users.service';
import { SignInDto } from './dto/signin.dto';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.usersService.create(createUserDto);
    return user;
  }

  async signIn(signInDto: SignInDto): Promise<{ token: string }> {
    const { email, password } = signInDto;
    const user = await this.usersRepository.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Email/Password incorrect');
    }

    const passwordCompare = await compare(password, user.password);
    if (!passwordCompare) {
      throw new UnauthorizedException('Email/Password incorrect');
    }
    const payload: JwtPayload = { email };
    const token = this.jwtService.sign(payload);
    return { token };
  }
}
