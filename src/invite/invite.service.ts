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
import InviteCode from './invite.entity';
import * as referralCodeGenerator from 'referral-code-generator';
@Injectable()
export class InviteService {
  constructor(
    @InjectRepository(InviteCode)
    private readonly inviteCodeRepository: Repository<InviteCode>,
  ) {}

  async getAllInviteCode(): Promise<InviteCode[]> {
    const codes = await this.inviteCodeRepository.find();
    return codes;
  }

  async generateInviteCode(): Promise<InviteCode> {
    const code = referralCodeGenerator.alpha('uppercase', 8);
    return await this.inviteCodeRepository.save({
      code: code,
    });
  }

  async generateInviteCodes(count: number) {
    const codes = [];
    for (let i = 0; i < count; i++) {
      codes.push({
        code: referralCodeGenerator.alpha('uppercase', 8),
      });
    }
    return await this.inviteCodeRepository.save(codes);
  }

  async validateInviteCode(code: string): Promise<{ valid: boolean }> {
    const found = await this.inviteCodeRepository.findOne({
      where: {
        code: code,
      },
    });

    if (!found) {
      throw new NotFoundException('Invite code expired or not found');
    }
    const { affected } = await this.inviteCodeRepository.delete(found);
    return {
      valid: Boolean(affected),
    };
  }
}
