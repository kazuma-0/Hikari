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
    const event = {
      ...createAchievementDto,
      slug: slugify(createAchievementDto.title + '-' + Date.now()),
    };
    return await this.achievenmentRepository.save(event);
  }

  async updateAchievement(
    updateAchievementDto: UpdateAchievementDto,
  ): Promise<Achievement> {
    await this.achievenmentRepository.delete(updateAchievementDto.id);
    const event = {
      ...updateAchievementDto,
      // slug: slugify(updateEventDto.title),
    };
    return await this.achievenmentRepository.save(event);
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
