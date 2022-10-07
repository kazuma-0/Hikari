import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Event from './events.entity';
import CreateEventDto from './dto/create-event.dto';
import UpdateEventDto from './dto/update-event.dto';
import slugify from 'slugify';
@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async getAllEvents(): Promise<Event[]> {
    return await (await this.eventRepository.find({})).reverse();
  }

  async getEventBySlug(slug: string): Promise<Event> {
    const found = await this.eventRepository.findOne({
      where: {
        slug: slug,
      },
    });
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }
  async createEvent(createEventDto: CreateEventDto): Promise<Event> {
    const event = {
      ...createEventDto,
      slug: slugify(createEventDto.title + Date.now()),
    };
    return await this.eventRepository.save(event);
  }

  async updatePost(updateEventDto: UpdateEventDto) {
    const { affected } = await this.eventRepository.delete(updateEventDto.id);
    const event = {
      ...updateEventDto,
      // slug: slugify(updateEventDto.title),
    };
    return await this.eventRepository.save(event);
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
