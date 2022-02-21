import { Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;

  @CreateDateColumn({ name: 'updated_at' }) UpdatedAt: Date;
}
