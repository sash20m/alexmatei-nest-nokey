import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { BaseEntity } from '../BaseEntity';

@Entity()
export class Posts extends BaseEntity {
  @Column()
  title: string;

  @Column({ length: 10000 })
  text: string;

  @Column()
  coverUrl: string;

  @Column()
  isBookEssay: boolean;

  @Column({ nullable: true, default: 0 })
  likeNumber: number;
}

// relationship example
// 1:n relation with bookEntity ( from user entity)
// @OneToMany( type => BookEntity , book => book.user)
// books: BookEntity[];

// n:1 relation with books  ( from books entity )
// @ManyToOne(type => UserEntity, user => user.books)
// user: UserEntity;
