import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../BaseEntity';

@Entity()
export class User extends BaseEntity {
  @Column()
  username: string;

  @Column({
    type: 'varchar',
    select: false,
  })
  password: string;

  @Column({ default: 'user' })
  role: string;
}
