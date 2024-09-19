import { FindOneOptions } from 'typeorm';
import { BookEntity } from '../entities/book';

export default class BookService {
  public static async getAllBooks() {
    
  }
  public static async getBookById(id: number) {
    
  }
  public static async addBook(book: BookEntity) {
    
  }
  public static async updateBook(id: number, partialBook: Partial<BookEntity>) {
    
  }
  public static async checkAndGetIfBookExist(bookId: number): Promise<BookEntity> {
    console.log(bookId);
    return {} as BookEntity
  }
}
