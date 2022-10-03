import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
class InviteCode {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  code: string;
}

export default InviteCode;
