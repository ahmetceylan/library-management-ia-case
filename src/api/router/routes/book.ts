import express from 'express';
import BookController from '../../controllers/bookController';
import { BookValidation } from '../../helpers/validations/bookValidation';
const router = express.Router();


router
  .get('/books', BookController.getAllBooks)
  .post('/books', BookValidation.validateBook, BookController.insertBook)
  .get('/books/:id', BookController.getBookById)
  .put('/books/:id', BookController.updateBook)
  .delete('/books/:bookId', BookController.deleteBook);

export default router;
