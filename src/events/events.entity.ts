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
