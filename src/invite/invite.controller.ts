import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
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

  @Get('/all')
  @Roles(ROLE.EXECUTIVE, ROLE.TEACHER)
  @UseGuards(AuthGuard('web3'))
  async getInviteCodes() {
    return await this.inviteService.getAllInviteCode();
  }

  @Post('/new')
  @Roles(ROLE.EXECUTIVE, ROLE.TEACHER)
  @UseGuards(AuthGuard('web3'))
  async createInviteCode(): Promise<InviteCode> {
    return await this.inviteService.generateInviteCode();
  }

  @Post('/new/:count')
  @Roles(ROLE.EXECUTIVE, ROLE.TEACHER)
  @UseGuards(AuthGuard('web3'))
  async createInviteCodes(@Param('count') count: number) {
    return await this.inviteService.generateInviteCodes(count);
  }

  @Post('/validate')
  async validateInviteCode(@Body() data: { code: string }): Promise<boolean> {
    return await this.inviteService.validateInviteCode(data.code);
  }
}
