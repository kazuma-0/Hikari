import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy } from 'passport-custom';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
import User from './user.entity';

@Injectable()
class WalletStrategy extends PassportStrategy(Strategy, 'web3') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(request: Request): Promise<any> {
    if (Object.keys(request.headers).includes('auth')) {
      const pubKey = request.headers['auth'];
      const user = this.authService.validateUser(pubKey);
      return user;
    }
  }
}

export default WalletStrategy;
