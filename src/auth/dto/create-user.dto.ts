import { IsEmail, IsEnum, IsNotEmpty, IsAlpha } from 'class-validator';
import { BRANCH } from '../user.entity';

class CreateUserDto {
  @IsAlpha('en', {
    message: 'Name should not contain numeric characteristsics',
  })
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
}

export default CreateUserDto;
