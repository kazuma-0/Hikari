import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import CreateUserDto from './dto/create-user.dto';
import LoginDto from './dto/login.dto';
import { Roles } from './role/role.decorator';
import ROLE from './role/role.enum';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/new')
  @UseGuards(AuthGuard('web3'))
  @Roles(ROLE.EXECUTIVE)
  async SignUp(@Body() createUserDto: CreateUserDto) {
    return await this.authService.createUser(createUserDto);
  }

  @Post('/login')
  async logIn(@Body() loginDto: LoginDto) {
    return await this.authService.validateUser(loginDto.pubKey);
  }
}
