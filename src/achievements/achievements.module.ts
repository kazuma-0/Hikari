import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Achievement from './achievement.entity';
import { AchievementsController } from './achievements.controller';
import { AchievementsService } from './achievements.service';

@Module({
  imports: [TypeOrmModule.forFeature([Achievement])],
  controllers: [AchievementsController],
  providers: [AchievementsService],
})
export class AchievementsModule {}
