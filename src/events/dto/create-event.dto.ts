import { IsNotEmpty } from 'class-validator';

class CreateEventDto {
  @IsNotEmpty()
  title: string;
  short_description: string;
  description: string;
  markdown: string;
  styles: string;
  image_url: string;
  author: string;
}

export default CreateEventDto;
