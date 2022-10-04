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
      const randomCount = Math.max(6, Math.floor(Math.random() * 10));
      codes.push({
        code: referralCodeGenerator.alpha('uppercase', randomCount),
      });
    }
    return await this.inviteCodeRepository.save(codes);
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
