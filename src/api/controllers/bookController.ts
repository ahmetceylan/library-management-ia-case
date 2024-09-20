import { Request, Response } from 'express';
import BookService from '../services/bookService';
import { CreateBookDto } from '../dtos';

class BookController {
  getAllBooks = async (req: Request, res: Response) => {
    const books = await BookService.getAllBooks();
    res.status(200).json(books);
  };

  getBookById = async (req: Request, res: Response) => {
    const { bookId } = req.params;
  
    const book = await BookService.getBookById(parseInt(bookId));
    res.status(200).json(book);
  };

  insertBook = async (req: Request, res: Response) => {
    const createBokRequest = req.body as CreateBookDto;
    await BookService.addBook(createBokRequest);
    res.status(201).send('');
  };

  updateBook = async (req: Request, res: Response) => {
    res.status(404).send({msg:'Not supported yet!'});
  };

  deleteBook = async (req: Request, res: Response) => {
    res.status(404).send({msg:'Not supported yet!'});
  };

};

export default new BookController();