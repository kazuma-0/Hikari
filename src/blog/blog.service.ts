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
import slugify from 'slugify';
import Blog from './blog.entity';
import CreateBlogPost from './dto/create-blogpost.dto';
import UpdateBlogPostDto from './dto/update-blogpost.dto';
@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
  ) {}

  async getAllBlogPosts(): Promise<Blog[]> {
    return await (
      await this.blogRepository.find({
        relations: ['author'],
      })
    ).reverse();
  }

  async getBlogPostBySlug(slug: string): Promise<Blog> {
    const found = await this.blogRepository.findOne({
      where: {
        slug: slug,
      },
      relations: ['author'],
    });
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }
  async createBlogPost(createBlogPostDto: CreateBlogPost): Promise<Blog> {
    const event = {
      ...createBlogPostDto,
      slug: slugify(createBlogPostDto.title + '-' + Date.now()),
    };
    return await this.blogRepository.save(event);
  }

  async updateBlogPost(updateBlogPostDto: UpdateBlogPostDto) {
    await this.blogRepository.delete(updateBlogPostDto.id);
    const event = {
      ...updateBlogPostDto,
      // slug: slugify(updateEventDto.title),
    };
    return await this.blogRepository.save(event);
  }

  async deleteBlogPost(id: number): Promise<number> {
    const { affected } = await this.blogRepository.delete(id);
    return affected;
  }

  async incrementLike(id: number): Promise<boolean> {
    const { affected } = await this.blogRepository.increment(
      {
        id: id,
      },
      'likes',
      1,
    );
    return Boolean(affected);
  }

  async decrementLike(id: number): Promise<boolean> {
    const { affected } = await this.blogRepository.decrement(
      {
        id: id,
      },
      'likes',
      1,
    );
    return Boolean(affected);
  }
}
