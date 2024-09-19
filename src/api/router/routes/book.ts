import express from 'express';
import BookController from '../../controllers/bookController';
import { BookValidation } from '../../helpers/validations/bookValidation';
const router = express.Router();


router
  .get('/', BookController.getAllBooks)
  .post('/', BookValidation.validateBook, BookController.insertBook)
  .get('/:id', BookController.getBookById)
  .put('/:id', BookController.updateBook)
  .delete('/:bookId', BookController.deleteBook);

export default router;
