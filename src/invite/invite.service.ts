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

  async generateInviteCode(): Promise<InviteCode> {
    const code = referralCodeGenerator.alpha('uppercase', 8);
    return await this.inviteCodeRepository.save({
      code: code,
    });
  }

  async validateInviteCode(code: string): Promise<boolean> {
    const found = await this.inviteCodeRepository.findOne({
      where: {
        code: code,
      },
    });

    if (!found) {
      throw new NotFoundException('Invite code expired or not found');
    }
    const { affected } = await this.inviteCodeRepository.delete(found);
    return Boolean(affected);
  }
}
