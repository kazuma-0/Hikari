import CreateEventDto from './create-event.dto';

class UpdateEventDto extends CreateEventDto {
  id: number;
  slug: string;
  created_at: Date;
  likes: number;
}

export default UpdateEventDto;
