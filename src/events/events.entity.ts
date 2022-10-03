import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Event {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  title: string;
  @Column({ default: Date.now() })
  created_at: string;
  @Column()
  short_description: string;
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
  @Column({ default: 0 })
  likes: number;
}

export default Event;
