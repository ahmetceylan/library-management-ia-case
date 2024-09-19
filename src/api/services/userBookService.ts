
import { BookEntity } from '../entities/book';
import { BorrowedBookEntity } from '../entities/borrowedBook';

export default class UserBookService {
  public static async getAllUserBooks() {

  }

  public static async getUserBookByUserAndBookId(userId: number, bookId: number) {

  }

  public static async addUserBook(userBook: BorrowedBookEntity) {

  }

  public static async updateUserBook(
    userId: number,
    bookId: number,
    partialUserBook: Partial<BorrowedBookEntity>
  ) {

  }

  private static async checkAndGetIfUserBookExist(
    userId: number,
    bookId: number
  ): Promise<BorrowedBookEntity> {
    return {} as BorrowedBookEntity
  }

  private static async isAnyUserUsingThisBook(bookId: number) {
    
  }

  private static async updateBooksScore(bookId: number) {
    
  }
}
