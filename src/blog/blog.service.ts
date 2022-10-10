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
    return await (await this.blogRepository.find({})).reverse();
  }

  async getBlogPostBySlug(slug: string): Promise<Blog> {
    const found = await this.blogRepository.findOne({
      where: {
        slug: slug,
      },
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
