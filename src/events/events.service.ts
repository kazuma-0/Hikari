import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Event from './events.entity';
import CreateEventDto from './dto/create-event.dto';
import UpdateEventDto from './dto/update-event.dto';
@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async getAllEvents(): Promise<Event[]> {
    return await this.eventRepository.find({});
  }

  async getEventById(id: number): Promise<Event> {
    const found = await this.eventRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }
  async createEvent(createEventDto: CreateEventDto): Promise<Event> {
    return await this.eventRepository.save(createEventDto);
  }

  async updatePost(updateEventDto: UpdateEventDto) {
    await this.eventRepository.delete(updateEventDto.id);
    return await this.eventRepository.save(updateEventDto);
  }

  async deleteEvent(id: number): Promise<number> {
    const { affected } = await this.eventRepository.delete(id);
    return affected;
  }

  async incrementLike(id: number): Promise<boolean> {
    const { affected } = await this.eventRepository.increment(
      {
        id: id,
      },
      'likes',
      1,
    );
    return Boolean(affected);
  }

  async decrementLike(id: number): Promise<boolean> {
    const { affected } = await this.eventRepository.decrement(
      {
        id: id,
      },
      'likes',
      1,
    );
    return Boolean(affected);
  }
}
