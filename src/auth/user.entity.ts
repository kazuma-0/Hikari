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
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import ROLE from 'src/auth/role/role.enum';
import Event from 'src/events/events.entity';
@Entity()
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({})
  name: string; // name
  @Column({ default: 'Computer Science and Engineering' })
  department: string; // department
  @Column({})
  branch: BRANCH; // branch
  @Column({ unique: true })
  roll_number: string; // roll number
  @Column({ unique: true })
  pubKey: string; // wallet public key
  @Column({})
  email: string;
  @CreateDateColumn()
  created_at: Date;
  @Column()
  role: ROLE;
  @OneToMany(() => Event, (event: Event) => event.author)
  events: Event[];
}

export default User;

enum BRANCH {
  AIDS = 'Artificial Intelligence and Data science',
  CSD = 'Computer Science and Design',
  CSE = 'Computer Science and Engineering',
  CSEC = 'Computer Science and Enginnering with Cybersecurity',
}

export { BRANCH };
