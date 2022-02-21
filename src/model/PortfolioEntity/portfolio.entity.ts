import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../BaseEntity';

@Entity()
export class Portfolio extends BaseEntity {
  @Column()
  title: string;

  @Column()
  projectUrl: string;

  @Column()
  coverUrl: string;

  @Column({ default: 0 })
  clicksNumber: number;
}
