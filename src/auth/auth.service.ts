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

import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateUserDto from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';
import User from './user.entity';

@Injectable()
export class AuthService {
  /**
   *
   */
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    try {
      return await this.userRepository.save(user);
    } catch (error) {
      if (error.code == '23505') {
        throw new NotAcceptableException('User already exists');
      }
    }
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async updateUser(updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.delete(updateUserDto.id);
    const data = await this.userRepository.save(updateUserDto);
    return data;
  }

  async deleteUser(id: string): Promise<boolean> {
    const { affected } = await this.userRepository.delete(id);
    return Boolean(affected);
  }

  async validateUser(pubKey: string) {
    const user = await this.userRepository.findOne({
      where: {
        pubKey: pubKey,
      },
    });
    if (!user) {
      throw new UnauthorizedException('User not in club.');
    }
    return user;
  }

  async getUserByPubKey(pubKey: string): Promise<User> {
    const found = await this.userRepository.findOne({
      where: {
        pubKey: pubKey,
      },
    });
    if (!found) {
      throw new NotFoundException('User not found.');
    }

    return found;
  }
}
