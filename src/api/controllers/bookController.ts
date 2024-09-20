import { Request, Response } from 'express';
import BookService from '../services/bookService';
import { CreateBookDto } from '../dtos';

class BookController {
  getAllBooks = async (req: Request, res: Response) => {
    try {
      const books = await BookService.getAllBooks();
      res.status(200).json(books);
    } catch (err: any) {
      res.status(err.status).send({msg: err.message, type: err.type})
    }
  };

  getBookById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const book = await BookService.getBookById(parseInt(id));
      res.status(200).json(book);
    } catch (err: any) {
      res.status(err.status).send({msg: err.message, type: err.type})
    }
  };

  insertBook = async (req: Request, res: Response) => {
    try {
      const createBokRequest = req.body as CreateBookDto;
      await BookService.addBook(createBokRequest);
      res.status(201).send('');
    } catch (err: any) {
      res.status(err.status).send({msg: err.message, type: err.type})
    }
  };

  updateBook = async (req: Request, res: Response) => {
    res.status(404).send({msg:'Not supported yet!'});
  };

  deleteBook = async (req: Request, res: Response) => {
    res.status(404).send({msg:'Not supported yet!'});
  };

};

export default new BookController();