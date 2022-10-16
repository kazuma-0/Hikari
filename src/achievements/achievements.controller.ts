import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/role/role.decorator';
import ROLE from 'src/auth/role/role.enum';
import Achievement from './achievement.entity';
import { AchievementsService } from './achievements.service';
import CreateAchievementDto from './dto/create-achievement.dto';
import UpdateAchievementDto from './dto/update-achievement.dto';

@Controller({
  path: 'achievement',
  version: '1',
})
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}

  @Get('/all')
  async getAllAchievements(): Promise<Achievement[]> {
    return this.achievementsService.getAllAchievements();
  }

  @Post('new')
  @UseGuards(AuthGuard('web3'))
  @Roles(ROLE.EXECUTIVE, ROLE.TEACHER)
  async createNewAchievement(
    @Body() createAchievementDto: CreateAchievementDto,
  ) {
    return await this.achievementsService.createAchievement(
      createAchievementDto,
    );
  }

  @Get('/:slug')
  async getEventById(@Param('slug') slug: string): Promise<Achievement> {
    return await this.achievementsService.getAchievementBySlug(slug);
  }

  @Put('/update')
  @UseGuards(AuthGuard('web3'))
  @Roles(ROLE.EXECUTIVE, ROLE.TEACHER)
  updateEvent(@Body() updateAchievementDto: UpdateAchievementDto) {
    return this.achievementsService.updateAchievement(updateAchievementDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('web3'))
  @Roles(ROLE.EXECUTIVE, ROLE.TEACHER)
  async deleteEvent(@Param('id') id: number): Promise<void> {
    await this.achievementsService.deleteAchievement(id);
  }
  @UseGuards(AuthGuard('web3'))
  // @Roles(ROLE.USER)
  @Put('/like/:id')
  async likeEvent(@Param('id') id: number): Promise<boolean> {
    return await this.achievementsService.incrementLike(id);
  }
  @Put('/disLike/:id')
  @UseGuards(AuthGuard('web3'))
  // @Roles(ROLE.USER)
  async dislikeEvent(@Param('id') id: number): Promise<boolean> {
    return await this.achievementsService.decrementLike(id);
  }
}
