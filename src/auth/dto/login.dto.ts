import { IsNotEmpty } from 'class-validator';

class LoginDto {
  @IsNotEmpty()
  pubKey: string;
}

export default LoginDto;
