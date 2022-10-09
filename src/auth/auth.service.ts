import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UnauthorizedException } from '@nestjs/common';
import CreateUserDto from './dto/create-user.dto';
import User from './user.entity';
import { type } from 'os';
import UpdateUserDto from './dto/update-user.dto';

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
