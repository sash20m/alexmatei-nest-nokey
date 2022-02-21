import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Books } from 'src/model/BooksEntity/books.entity';
import { AuthModule } from '../auth/auth.module';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

@Module({
  imports: [TypeOrmModule.forFeature([Books]), AuthModule],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
