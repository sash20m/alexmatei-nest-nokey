import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/guards/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guart';
import { BooksService } from './books.service';

@Controller('api/books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post('add')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('admin')
  addPost(
    @Body('title') title: string,
    @Body('author') author: string,
    @Body('coverUrl') coverUrl: string,
    @Body('postUrl') postUrl?: string,
  ) {
    return this.booksService.addBook({
      title,
      author,
      coverUrl,
      postUrl,
    });
  }

  @Get()
  getBooks() {
    return this.booksService.getBooks();
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  getBook(@Param('id') id: string) {
    return this.booksService.getBook(id);
  }

  @Patch()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('admin')
  editBook(
    @Body('data')
    data: {
      id: number;
      title: string;
      author: string;
      coverUrl: string;
      postUrl: string;
    },
  ) {
    if (!data) {
      throw new BadRequestException('Incorrect data');
    }
    return this.booksService.editBook(data);
  }

  @Delete('/delete/:id')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('admin')
  deleteBook(@Param('id') id: number) {
    return this.booksService.deleteBook(id);
  }
}
