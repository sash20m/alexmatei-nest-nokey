import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { BaseEntity } from '../BaseEntity';

@Entity()
export class Books extends BaseEntity {
  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  coverUrl: string;

  @Column({ default: '', nullable: true })
  postUrl: string;
}

// relationship example
// 1:n relation with bookEntity ( from user entity)
// @OneToMany( type => BookEntity , book => book.user)
// books: BookEntity[];

// n:1 relation with books  ( from books entity )
// @ManyToOne(type => UserEntity, user => user.books)
// user: UserEntity;
