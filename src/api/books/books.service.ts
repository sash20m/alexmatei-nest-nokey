import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Books } from 'src/model/BooksEntity/books.entity';
import { BooksModel } from 'src/model/BooksEntity/BooksModel';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Books)
    private booksRepository: Repository<Books>,
  ) {}

  addBook({ title, author, coverUrl, postUrl }): Promise<BooksModel> {
    const newBook = new BooksModel(title, author, coverUrl, postUrl);

    return this.booksRepository.save(newBook);
  }

  getBooks(): Promise<BooksModel[]> {
    return this.booksRepository.query(`
    SELECT * from books
    ORDER BY books.created_at
    `);
  }

  getBook(id): Promise<BooksModel> {
    return this.booksRepository.findOne(id);
  }

  public async editBook(data): Promise<BooksModel> {
    const { id } = data;

    const oldBook = await this.booksRepository.findOne({ id });

    const book = await this.booksRepository.save({
      ...oldBook,
      ...data,
    });

    return book;
  }

  deleteBook(id: number) {
    return this.booksRepository.delete(id);
  }
}
