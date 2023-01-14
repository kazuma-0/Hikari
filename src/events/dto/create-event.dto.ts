import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

class CreateEventDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsString()
  tags: string;
  @IsNotEmpty()
  @IsString()
  description: string;
  @IsNotEmpty()
  @IsString()
  source: string;
  @IsNotEmpty()
  @IsString()
  image_url: string;
  // @IsNotEmpty()
  // @IsString()
  authorId: string;
}

export default CreateEventDto;
