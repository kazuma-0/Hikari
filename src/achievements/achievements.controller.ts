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
