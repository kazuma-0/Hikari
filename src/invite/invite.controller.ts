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
  async validateInviteCode(
    @Body() data: { code: string },
  ): Promise<{ valid: boolean }> {
    return await this.inviteService.validateInviteCode(data.code);
  }
}
