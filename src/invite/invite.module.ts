import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InviteController } from './invite.controller';
import InviteCode from './invite.entity';
import { InviteService } from './invite.service';

@Module({
  imports: [TypeOrmModule.forFeature([InviteCode])],
  controllers: [InviteController],
  providers: [InviteService],
})
export class InviteModule {}
