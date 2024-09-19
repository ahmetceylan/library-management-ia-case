import { Request, Response } from 'express';
import UserBookService from '../services/userBookService';
import { BorrowedBookEntity } from '../entities/borrowedBook';

class UserBookController {
  borrowBook = async (req: Request, res: Response) => {
    const { userId, bookId } = req.params;
    
    res.status(204).send('');
  };

  returnBook = async (req: Request, res: Response) => {
    const { userId, bookId } = req.params;
    
    res.status(204).send('');
  }

};

export default new UserBookController();