import CreateEventDto from './create-event.dto';

class UpdateEventDto extends CreateEventDto {
  id: number;
  slug: string;
  likes: number;
}

export default UpdateEventDto;
