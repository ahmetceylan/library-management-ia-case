import { FindOneOptions, Repository } from 'typeorm';
import AppDataSource from '../datastore/config';
import { BookEntity } from '../entities/book';
import { NotFoundError } from '../helpers/errors/notFoundError';
import BookDtoMapper from './mappers/bookDtoMapper';
import { CreateBookDto } from '../dtos';

class BookService {
  public getRepository(): Repository<BookEntity> {
    return AppDataSource.getInstance().getRepository(BookEntity)
  }

  public async getAllBooks() {
    const allBooks = await this.getRepository().find();
    return BookDtoMapper.toList(allBooks);;
  }

  public async getBookById(id: number) {
    try {
      const book: BookEntity = await this.checkAndGetIfBookExist(id);
      return BookDtoMapper.toBookDto(book);
    } catch (error) {
      throw error
    }
  }

  public async addBook(createBookRequest: CreateBookDto) {
    const bookEntity = new BookEntity();
    bookEntity.name = createBookRequest.name;
    await this.getRepository().insert(bookEntity);
  }

  public async checkAndGetIfBookExist(bookId: number): Promise<BookEntity> {
    const book = await this.getRepository().findOne({ where: { id: bookId } } as FindOneOptions<BookEntity>);
    console.log("AHMET book: ", book)
    if (!book) {
      console.log("AHMET book is undefined: ", book)
      throw new NotFoundError('Book not found!');
    }

    console.log("AHMET return book ", book)
    return book;
  }
}
export default  new BookService()