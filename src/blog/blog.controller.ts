import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/role/role.decorator';
import ROLE from 'src/auth/role/role.enum';
import Blog from './blog.entity';
import { BlogService } from './blog.service';
import CreateBlogPostDto from './dto/create-blogpost.dto';
import UpdateBlogPostDto from './dto/update-blogpost.dto';
@Controller({
  path: 'blog',
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
  createEvent(@Body() createBlogPostDto: CreateBlogPostDto): Promise<Blog> {
    return this.blogService.createBlogPost(createBlogPostDto);
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
