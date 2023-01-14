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
