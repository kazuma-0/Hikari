import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Achievement {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  title: string;
  @Column()
  author: string;
  @Column()
  duration: string;
  @Column()
  type: string;
  @Column()
  description: string;
  @Column()
  image: string;
}

export default Achievement;
