import { Request, Response } from 'express';
import UserBorrowedBookService from '../services/userBorrowedBookService';
import { BorrowedBookEntity } from '../entities';
import { BorrowBookRequestDto } from '../dtos/BorrowBookRequestDto';
import { ReturnBookRequestDto } from '../dtos/returnBookRequestDto';

class UserBorrowedBookController {
  constructor() {}

  borrowBook = async (req: Request, res: Response) => {
    const { userId, bookId } = req.params;
    const userBorrowBookRequest = {
      userId: parseInt(userId),
      bookId: parseInt(bookId),
      isReturned: false,
      score: -1,
    } as BorrowBookRequestDto;
  
    await UserBorrowedBookService.addUserBook(userBorrowBookRequest);
    res.status(201).send('');
  }

  returnBook = async (req: Request, res: Response) => {
    const { userId, bookId } = req.params;
    const returnRequest = req.body as ReturnBookRequestDto;
    returnRequest.bookId = parseInt(bookId);
    returnRequest.userId = parseInt(userId);
  
  
    await UserBorrowedBookService.updateUserBook(returnRequest);
  
    res.status(204).send('');
  }
}

export default new UserBorrowedBookController();