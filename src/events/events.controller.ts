import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
  UseGuards,
  Req,
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
  createEvent(
    @Body() createEventDto: CreateEventDto,
    @Req() req,
  ): Promise<Event> {
    return this.eventService.createEvent({
      ...createEventDto,
      authorId: req.user.id,
    });
  }
  @Get('/:slug')
  async getEventById(@Param('slug') slug: string): Promise<Event> {
    return await this.eventService.getEventBySlug(slug);
  }

  @Put('/update')
  @UseGuards(AuthGuard('web3'))
  @Roles(ROLE.EXECUTIVE, ROLE.TEACHER)
  async updateEvent(@Body() updateEventDto: UpdateEventDto) {
    console.log(updateEventDto);
    const data = await this.eventService.updatePost(updateEventDto);
    return data;
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
