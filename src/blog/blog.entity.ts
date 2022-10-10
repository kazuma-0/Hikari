import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
class Blog {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  title: string;
  // @Column({ default: Date.now() })
  @CreateDateColumn()
  created_at: Date;
  @Column()
  tags: string;
  @Column()
  description: string;
  @Column()
  markdown: string;
  @Column()
  styles: string;
  @Column()
  image_url: string;
  @Column()
  author: string;
  @Column()
  slug: string;
  @Column({ default: 0 })
  likes: number;
}

export default Blog;
