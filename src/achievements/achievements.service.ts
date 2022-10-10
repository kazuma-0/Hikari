import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Achievement from './achievement.entity';
import CreateAchievementDto from './dto/create-achievement.dto';

@Injectable()
export class AchievementsService {
  /**
   *
   */
  constructor(
    @InjectRepository(Achievement)
    private readonly achievementRepository: Repository<Achievement>,
  ) {}

  async getAllAchievements(): Promise<Achievement[]> {
    return await this.achievementRepository.find({});
  }

  async createAchievement(
    createAchievementDto: CreateAchievementDto,
  ): Promise<Achievement> {
    return await this.achievementRepository.save(createAchievementDto);
  }
}
