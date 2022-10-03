import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import AuthStrategy from './auth.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './user.entity';
import RolesGuard from './role/role.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [PassportModule, TypeOrmModule.forFeature([User])],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    AuthService,
    AuthStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
