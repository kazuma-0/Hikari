import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { EventsService } from './events.service';
import Event from './events.entity';
import CreateEventDto from './dto/create-event.dto';
import UpdateEventDto from './dto/update-event.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/role/role.decorator';
import ROLE from 'src/auth/role/role.enum';
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
  @Post('/new')
  @UseGuards(AuthGuard('web3'))
  @Roles(ROLE.EXECUTIVE, ROLE.TEACHER)
  createEvent(@Body() createEventDto: CreateEventDto): Promise<Event> {
    return this.eventService.createEvent(createEventDto);
  }
  @Get('/:slug')
  async getEventById(@Param('slug') slug: string): Promise<Event> {
    const result = await this.eventService.getEventBySlug(slug);
    return result;
  }

  @Put('/update')
  @UseGuards(AuthGuard('web3'))
  @Roles(ROLE.EXECUTIVE, ROLE.TEACHER)
  updateEvent(@Body() updateEventDto: UpdateEventDto) {
    return this.eventService.updatePost(updateEventDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('web3'))
  @Roles(ROLE.EXECUTIVE, ROLE.TEACHER)
  async deleteEvent(@Param('id') id: number): Promise<void> {
    await this.eventService.deleteEvent(id);
  }
  @UseGuards(AuthGuard('web3'))
  // @Roles(ROLE.USER)
  @Put('/like/:id')
  async likeEvent(@Param('id') id: number): Promise<boolean> {
    return await this.eventService.incrementLike(id);
  }
  @Put('/disLike/:id')
  @UseGuards(AuthGuard('web3'))
  // @Roles(ROLE.USER)
  async dislikeEvent(@Param('id') id: number): Promise<boolean> {
    return await this.eventService.decrementLike(id);
  }
}
