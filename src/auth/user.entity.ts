import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import ROLE from 'src/auth/role/role.enum';
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
  @Column({ default: Date.now() })
  created_at: string;
  @Column()
  role: ROLE;
}

export default User;

enum BRANCH {
  AIDS = 'Artificial Intelligence and Data science',
  CSD = 'Computer Science and Design',
  CSE = 'Computer Science and Engineering',
  CSEC = 'Computer Science and Enginnering with Cybersecurity',
}

export { BRANCH };
