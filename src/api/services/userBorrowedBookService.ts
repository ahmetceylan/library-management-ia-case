
import { FindManyOptions, FindOneOptions, Not, Repository } from 'typeorm';
import AppDataSource from '../datastore/config';
import { BookEntity } from '../entities/book';
import { BorrowedBookEntity } from '../entities/borrowedBook';
import UserService from './userService';
import BookService from './bookService';
import { BorrowBookRequestDto } from '../dtos/BorrowBookRequestDto';
import { NotFoundError } from '../helpers/errors/notFoundError';
import { ReturnBookRequestDto } from '../dtos/returnBookRequestDto';
import { BadRequestError } from '../helpers/errors/badRequestError';

class UserBorrowedBookService {
  public getRepository(): Repository<BorrowedBookEntity> {
    return AppDataSource.getInstance().getRepository(BorrowedBookEntity)
  }


  public async getAllUserBooks() {
    const data: BorrowedBookEntity[] = await this.getRepository().find();
    return data;
  }

  public async getUserBookByUserAndBookId(userId: number, bookId: number) {
    const userBook: BorrowedBookEntity | null = await this.getRepository().findOne({
      where: { userId, bookId },
    } as FindOneOptions<BorrowedBookEntity>);

    if (!userBook) {
      throw new Error('BorrowedBookEntity not found!');
    }

    return userBook;
  }

  public async addUserBook(userBorrowBookRequest: BorrowBookRequestDto) {
    // checks
    await UserService.checkAndGetIfUserExist(userBorrowBookRequest.userId);
    await BookService.checkAndGetIfBookExist(userBorrowBookRequest.bookId);
    if (await this.isBookAvailableForBorrowing(userBorrowBookRequest.bookId)) {
      await this.getRepository().insert(userBorrowBookRequest);
    }
  }

  public async updateUserBook(
    returnRequest: ReturnBookRequestDto
  ) {
    const {userId, bookId, score} = returnRequest;
    
    const userBorrowedBook = await this.getRepository().findOne({
      where: { bookId, userId, isReturned: false },
    } as FindOneOptions<BorrowedBookEntity>);

    if (!userBorrowedBook) throw new NotFoundError(`This book has not been borrowed from this user yet! userId: ${userId} bookId:${bookId} `);

    const userBorrowedBookEntity: BorrowedBookEntity =  new BorrowedBookEntity()
    
    userBorrowedBookEntity.userId = returnRequest.userId;
    userBorrowedBookEntity.bookId = returnRequest.bookId;
    userBorrowedBookEntity.score = score;
    userBorrowedBookEntity.isReturned = true;
    
    await this.getRepository().update({ id: userBorrowedBook.id, userId, bookId }, userBorrowedBookEntity);

    await this.updateBooksScore(userBorrowedBookEntity.bookId);
  }

  private async isBookAvailableForBorrowing(bookId: number): Promise<boolean> {
    const notReturnedBookCountWithThisId = await this.getRepository().count({
      where: { bookId, isReturned: false },
    } as FindManyOptions<BorrowedBookEntity>);

    if (notReturnedBookCountWithThisId > 0) {
      throw new BadRequestError(`This book is already borrowed! bookId: ${bookId}`);
    }
    return true;
  }

  private async updateBooksScore(bookId: number) {
    const bookScoredDifferentFromZero = await this.getRepository().find({
      where: { bookId, score: Not(-1) },
    } as FindManyOptions<BorrowedBookEntity>);

    const sum = bookScoredDifferentFromZero.reduce((acc, curr) => acc + curr.score, 0);
    const count = bookScoredDifferentFromZero.length;

    const newAverage = parseFloat((sum / count).toFixed(2));

    const partialBook: Partial<BookEntity> = {
      score: newAverage,
    };
    
    await BookService.getRepository().update(bookId, partialBook);
  }
}

export default new UserBorrowedBookService()