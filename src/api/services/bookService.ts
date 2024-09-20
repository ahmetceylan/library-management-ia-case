import { FindOneOptions, Repository } from 'typeorm';
import AppDataSource from '../datastore/config';
import { BookEntity } from '../entities/book';
import { NotFoundError } from '../helpers/errors/notFoundError';
import BookDtoMapper from './mappers/bookDtoMapper';
import { CreateBookDto } from '../dtos';

export default class BookService {
  public static getRepository(): Repository<BookEntity> {
    return AppDataSource.getInstance().getRepository(BookEntity)
  }

  public static async getAllBooks() {
    const allBooks = await this.getRepository().find();
    return BookDtoMapper.toList(allBooks);;
  }
  public static async getBookById(id: number) {
    const book: BookEntity = await this.checkAndGetIfBookExist(id);
    return  BookDtoMapper.toBookDto(book);
  }

  public static async addBook(createBookRequest: CreateBookDto) {
    const bookEntity = new BookEntity();
    bookEntity.name = createBookRequest.name;
    await this.getRepository().insert(bookEntity);
  }

  public static async checkAndGetIfBookExist(bookId: number): Promise<BookEntity> {
    const book = await this.getRepository().findOne({ where: { id: bookId } } as FindOneOptions<BookEntity>);
    if (!book) throw new NotFoundError('Book not found!');

    return book;
  }
}
