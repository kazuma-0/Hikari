import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

class CreateEventDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;
  tags: string;
  description: string;
  markdown: string;
  styles: string;
  image_url: string;
  author: string;
}

export default CreateEventDto;
