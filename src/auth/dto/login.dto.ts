import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  pubKey: string;
}

export default LoginDto;
