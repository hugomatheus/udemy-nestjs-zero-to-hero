import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { IsCPF } from 'src/utils/validator/cpf';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsCPF('cpf', { message: 'CPF invalid' })
  cpf: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
  password: string;
}
