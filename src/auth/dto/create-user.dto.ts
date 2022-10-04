import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsAlpha,
  IsString,
} from 'class-validator';
import ROLE from 'src/auth/role/role.enum';
import { BRANCH } from '../user.entity';

class CreateUserDto {
  @IsString()
  name: string;
  @IsNotEmpty()
  department: string;
  @IsEnum(BRANCH)
  branch: BRANCH;
  @IsNotEmpty()
  roll_number: string;
  @IsNotEmpty()
  pubKey: string;
  @IsEmail()
  email: string;
  @IsEnum(ROLE)
  role: ROLE;
}

export default CreateUserDto;
