import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
} from '@nestjs/common';
import { EventsService } from './events.service';
import Event from './events.entity';
import CreateEventDto from './dto/create-event.dto';
import UpdateEventDto from './dto/update-event.dto';
@Controller({
  path: 'event',
  version: '1',
})
export class EventsController {
  constructor(private readonly eventService: EventsService) {}

  @Get('/all')
  getEvents(): Promise<Event[]> {
    return this.eventService.getAllEvents();
  }

  @Get('/:id')
  async getEventById(@Param('id') id: number): Promise<Event> {
    const result = await this.eventService.getEventById(id);
    return result;
  }

  @Post('/new')
  createEvent(@Body() createEventDto: CreateEventDto): Promise<Event> {
    return this.eventService.createEvent(createEventDto);
  }

  @Put('/update')
  updateEvent(@Body() updateEventDto: UpdateEventDto) {
    this.eventService.updatePost(updateEventDto);
  }

  @Delete(':id')
  async deleteEvent(@Param('id') id: number): Promise<void> {
    await this.eventService.deleteEvent(id);
  }
  @Put('/like/:id')
  async likeEvent(@Param('id') id: number): Promise<boolean> {
    return await this.eventService.incrementLike(id);
  }
  @Put('/disLike/:id')
  async dislikeEvent(@Param('id') id: number): Promise<boolean> {
    return await this.eventService.decrementLike(id);
  }
}
