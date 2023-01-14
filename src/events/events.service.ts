// Copyright (c) 2023 Anuj S and The Wired
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import { Injectable, NotFoundException, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Event from './events.entity';
import CreateEventDto from './dto/create-event.dto';
import UpdateEventDto from './dto/update-event.dto';
import slugify from 'slugify';
import { randomUUID } from 'crypto';
@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async getAllEvents(): Promise<Event[]> {
    return await (
      await this.eventRepository.find({
        relations: ['author'],
      })
    ).reverse();
  }

  async getEventBySlug(slug: string): Promise<Event> {
    const found = await this.eventRepository.findOne({
      where: {
        slug: slug,
      },
      relations: ['author'],
    });
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }
  async createEvent(createEventDto: CreateEventDto): Promise<Event> {
    const event = {
      ...createEventDto,
      slug: slugify(createEventDto.title + '-' + randomUUID()),
    };
    // return await this.eventRepository.create(event);
    return await this.eventRepository.save(event);
  }

  async updatePost(updateEventDto: UpdateEventDto) {
    // const { affected } = await this.eventRepository.delete(updateEventDto.id);
    await this.eventRepository.update(
      {
        slug: updateEventDto.slug,
      },
      updateEventDto,
    );
    console.log('updated');
    return {
      slug: updateEventDto.slug,
    };
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
