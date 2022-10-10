import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/role/role.decorator';
import ROLE from 'src/auth/role/role.enum';
import Achievement from './achievement.entity';
import { AchievementsService } from './achievements.service';
import CreateAchievementDto from './dto/create-achievement.dto';

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
}
