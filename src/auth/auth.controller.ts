import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import CreateUserDto from './dto/create-user.dto';
import LoginDto from './dto/login.dto';
import UpdateUserDto from './dto/update-user.dto';
import { Roles } from './role/role.decorator';
import ROLE from './role/role.enum';
import User from './user.entity';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/new')
  // @UseGuards(AuthGuard('web3'))
  // @Roles(ROLE.EXECUTIVE)
  async SignUp(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.authService.createUser(createUserDto);
  }

  @Post('/login')
  async logIn(@Body() loginDto: LoginDto): Promise<User> {
    return await this.authService.validateUser(loginDto.pubKey);
  }

  @Get('/user/all')
  // @Roles(ROLE.EXECUTIVE, ROLE.TEACHER)
  // @UseGuards(AuthGuard('web3'))
  async getUsers(): Promise<User[]> {
    return this.authService.getAllUsers();
  }

  @Put('/user/update')
  @Roles(ROLE.EXECUTIVE, ROLE.TEACHER)
  @UseGuards(AuthGuard('web3'))
  async updateUser(@Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.authService.updateUser(updateUserDto);
  }

  @Delete('/user/:id')
  @Roles(ROLE.EXECUTIVE, ROLE.TEACHER)
  @UseGuards(AuthGuard('web3'))
  async deleteUser(@Param('id') id: string): Promise<boolean> {
    return this.authService.deleteUser(id);
  }

  @Get('/user/:pubKey')
  @Roles(ROLE.EXECUTIVE, ROLE.TEACHER, ROLE.USER)
  @UseGuards(AuthGuard('web3'))
  async getUser(@Param('pubKey') pubKey: string): Promise<User> {
    return this.authService.getUserByPubKey(pubKey);
  }
}
