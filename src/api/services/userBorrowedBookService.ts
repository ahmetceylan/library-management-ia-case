
import { FindManyOptions, FindOneOptions, Not, Repository } from 'typeorm';
import AppDataSource from '../datastore/config';
import { BookEntity } from '../entities/book';
import { BorrowedBookEntity } from '../entities/borrowedBook';
import UserService from './userService';
import BookService from './bookService';
import { BorrowBookRequestDto } from '../dtos/BorrowBookRequestDto';
import { NotFoundError } from '../helpers/errors/notFoundError';
import { ReturnBookRequestDto } from '../dtos/returnBookRequestDto';

export default class UserBorrowedBookService {
  public static getRepository(): Repository<BorrowedBookEntity> {
    return AppDataSource.getInstance().getRepository(BorrowedBookEntity)
  }


  public static async getAllUserBooks() {
    const data: BorrowedBookEntity[] = await this.getRepository().find();
    return data;
  }

  public static async getUserBookByUserAndBookId(userId: number, bookId: number) {
    const userBook: BorrowedBookEntity | null = await this.getRepository().findOne({
      where: { userId, bookId },
    } as FindOneOptions<BorrowedBookEntity>);

    if (!userBook) {
      throw new Error('BorrowedBookEntity not found!');
    }

    return userBook;
  }

  public static async addUserBook(userBorrowBookRequest: BorrowBookRequestDto) {
    // checks
    await UserService.checkAndGetIfUserExist(userBorrowBookRequest.userId);
    await BookService.checkAndGetIfBookExist(userBorrowBookRequest.bookId);
    await this.isAnyUserUsingThisBook(userBorrowBookRequest.bookId);

  
    await this.getRepository().insert(userBorrowBookRequest);
  }

  public static async updateUserBook(
    returnRequest: ReturnBookRequestDto
  ) {
    const {userId, bookId} = returnRequest;
    
    const userBorrowedBook = await this.getRepository().findOne({
      where: { bookId, userId, isReturned: false },
    } as FindOneOptions<BorrowedBookEntity>);

    if (!userBorrowedBook) throw new NotFoundError(`This book has not been borrowed from this user yet! userId: ${userId} bookId:${bookId} `);

    const userBorrowedBookEntity: BorrowedBookEntity =  new BorrowedBookEntity()
    
    userBorrowedBookEntity.userId = returnRequest.userId;
    userBorrowedBookEntity.bookId = returnRequest.bookId;
    
    await this.getRepository().update({ id: userBorrowedBook.id, userId, bookId }, userBorrowedBookEntity);

    await this.updateBooksScore(userBorrowedBookEntity.bookId);
  }

  // private static async checkAndGetIfUserBorrowedBookExist(
  //   userId: number,
  //   bookId: number
  // ): Promise<BorrowedBookEntity> {
  //   const book = await this.getRepository().findOne({
  //     where: { bookId, userId },
  //   } as FindOneOptions<BorrowedBookEntity>) as BorrowedBookEntity;
  //   if (!book) throw new NotFoundError(`There is no book borrowed from this user! userId: ${userId}`);

  //   return book;
  // }

  private static async isAnyUserUsingThisBook(bookId: number) {
    const notReturnedBookCountWithThisId = await this.getRepository().count({
      where: { bookId, isReturned: false },
    } as FindManyOptions<BorrowedBookEntity>);

    if (notReturnedBookCountWithThisId > 0) throw new Error(`This book is used in now! bookId: bookId: ${bookId}`);
    
  }

  private static async updateBooksScore(bookId: number) {
    const bookScoredDifferentFromZero = await this.getRepository().find({
      where: { bookId, score: Not(-1) },
    } as FindManyOptions<BorrowedBookEntity>);

    const sum = bookScoredDifferentFromZero.reduce((acc, curr) => acc + curr.score, 0);
    const count = bookScoredDifferentFromZero.length;

    const newAverage = parseFloat((sum / count).toFixed(2));

    const partialBook: Partial<BorrowedBookEntity> = {
      score: newAverage,
    };
    //TODO check!!
    // await BookService.getRepository().update(bookId, partialBook);
    
    await this.getRepository().update(bookId, partialBook);
  }
}
