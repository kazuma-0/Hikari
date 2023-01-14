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

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import slugify from 'slugify';
import Achievement from './achievement.entity';
import CreateAchievementDto from './dto/create-achievement.dto';
import UpdateAchievementDto from './dto/update-achievement.dto';
@Injectable()
export class AchievementsService {
  constructor(
    @InjectRepository(Achievement)
    private readonly achievenmentRepository: Repository<Achievement>,
  ) {}

  async getAllAchievements(): Promise<Achievement[]> {
    return await (await this.achievenmentRepository.find({})).reverse();
  }

  async getAchievementBySlug(slug: string): Promise<Achievement> {
    const found = await this.achievenmentRepository.findOne({
      where: {
        slug: slug,
      },
    });
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }
  async createAchievement(
    createAchievementDto: CreateAchievementDto,
  ): Promise<Achievement> {
    const achievement = {
      ...createAchievementDto,
      slug: slugify(createAchievementDto.title + '-' + Date.now()),
    };
    return await this.achievenmentRepository.save(achievement);
  }

  async updateAchievement(
    updateAchievementDto: UpdateAchievementDto,
  ): Promise<Achievement> {
    await this.achievenmentRepository.delete(updateAchievementDto.id);
    const achievement = {
      ...updateAchievementDto,
      // slug: slugify(updateEventDto.title),
    };
    return await this.achievenmentRepository.save(achievement);
  }

  async deleteAchievement(id: number): Promise<number> {
    const { affected } = await this.achievenmentRepository.delete(id);
    return affected;
  }

  async incrementLike(id: number): Promise<boolean> {
    const { affected } = await this.achievenmentRepository.increment(
      {
        id: id,
      },
      'likes',
      1,
    );
    return Boolean(affected);
  }

  async decrementLike(id: number): Promise<boolean> {
    const { affected } = await this.achievenmentRepository.decrement(
      {
        id: id,
      },
      'likes',
      1,
    );
    return Boolean(affected);
  }
}
