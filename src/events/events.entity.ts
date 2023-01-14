import User from 'src/auth/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
class Event {
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
  source: string;
  @Column()
  image_url: string;
  @ManyToOne(() => User, (user: User) => user.id)
  @JoinColumn({ name: 'authorId' })
  author: User;
  @Column()
  authorId: string;
  @Column()
  slug: string;
  @Column({ default: 0 })
  likes: number;
  @Column({ default: 0 })
  views: number;
  @Column({ default: false })
  isDraft: boolean;
}

export default Event;
