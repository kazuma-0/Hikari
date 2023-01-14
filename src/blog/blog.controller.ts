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
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/role/role.decorator';
import ROLE from 'src/auth/role/role.enum';
import Blog from './blog.entity';
import { BlogService } from './blog.service';
import CreateBlogPostDto from './dto/create-blogpost.dto';
import UpdateBlogPostDto from './dto/update-blogpost.dto';
@Controller({
  path: 'projects-and-publications',
  version: '1',
})
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('/all')
  getEvents(): Promise<Blog[]> {
    return this.blogService.getAllBlogPosts();
  }
  @Post('/new')
  @UseGuards(AuthGuard('web3'))
  @Roles(ROLE.EXECUTIVE, ROLE.TEACHER)
  createEvent(
    @Body() createBlogPostDto: CreateBlogPostDto,
    @Req() req,
  ): Promise<Blog> {
    return this.blogService.createBlogPost({
      ...createBlogPostDto,
      authorId: req.user.id,
    });
  }
  @Get('/:slug')
  async getEventById(@Param('slug') slug: string): Promise<Blog> {
    const result = await this.blogService.getBlogPostBySlug(slug);
    return result;
  }

  @Put('/update')
  @UseGuards(AuthGuard('web3'))
  @Roles(ROLE.EXECUTIVE, ROLE.TEACHER)
  updateEvent(@Body() updateBlogPostDto: UpdateBlogPostDto) {
    return this.blogService.updateBlogPost(updateBlogPostDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('web3'))
  @Roles(ROLE.EXECUTIVE, ROLE.TEACHER)
  async deleteEvent(@Param('id') id: number): Promise<void> {
    await this.blogService.deleteBlogPost(id);
  }
  @UseGuards(AuthGuard('web3'))
  // @Roles(ROLE.USER)
  @Put('/like/:id')
  async likeEvent(@Param('id') id: number): Promise<boolean> {
    return await this.blogService.incrementLike(id);
  }
  @Put('/disLike/:id')
  @UseGuards(AuthGuard('web3'))
  // @Roles(ROLE.USER)
  async dislikeEvent(@Param('id') id: number): Promise<boolean> {
    return await this.blogService.decrementLike(id);
  }
}
