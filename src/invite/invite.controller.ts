import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { get } from 'http';
import { Roles } from 'src/auth/role/role.decorator';
import ROLE from 'src/auth/role/role.enum';
import InviteCode from './invite.entity';
import { InviteService } from './invite.service';

@Controller({
  path: 'invite',
  version: '1',
})
export class InviteController {
  constructor(private readonly inviteService: InviteService) {}

  @Post('/new')
  @Roles(ROLE.EXECUTIVE, ROLE.TEACHER)
  @UseGuards(AuthGuard('web3'))
  async createInviteCode(): Promise<InviteCode> {
    return await this.inviteService.generateInviteCode();
  }

  @Post('/validate/:code')
  async validateInviteCode(@Param('code') code: string): Promise<boolean> {
    return await this.inviteService.validateInviteCode(code);
  }
}
