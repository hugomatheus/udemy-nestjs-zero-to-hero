import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersRepository } from 'src/modules/users/users.repository';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersRepository: UsersRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.APP_SECRET,
    });
  }

  async validate(payload: JwtPayload): Promise<{ id: string }> {
    const { email } = payload;
    const user = await this.usersRepository.findOne({ email });
    if (!user) {
      throw new UnauthorizedException();
    }
    return { id: user.id };
  }
}
