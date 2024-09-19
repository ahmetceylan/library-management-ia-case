import { Request, Response } from 'express';
import BookService from '../services/bookService';

class BookController {
  getAllBooks = async (req: Request, res: Response) => {
    const books = await BookService.getAllBooks();
    res.status(200).json({});
  };

  getBookById = async (req: Request, res: Response) => {
    const { bookId } = req.params;
    res.status(200).json({});
  };
  insertBook = async (req: Request, res: Response) => {
    res.status(201).send('');
  };
  updateBook = async (req: Request, res: Response) => {
    res.status(200).send('update book');
  };
  deleteBook = async (req: Request, res: Response) => {
    res.status(200).send('Delete books');
  };

};

export default new BookController();