import express from 'express';
// const validate = require('../../helpers/validate');
var router = express.Router();

/**
 * CONTROLLER
 */
import UserController from '../../controllers/userController';
import UserBorrowedBookController from '../../controllers/userBorrowedBookController';

import { UserBookValidation } from '../../helpers/validations/userBookValidation';
import { UserValidation } from '../../helpers/validations/userValidation';

/**
 * ROUTES
 */
// router.get('/', [validate], UserController.getAllUsers);
router
  .get('/users', UserController.getAllUsers)
  .post('/users', UserValidation.validateUser, UserController.insertUser)
  .get('/users/:userId', UserController.getUserById)
  .put('/users/:userId', UserController.updateUser)
  .delete('/users/:userId', UserController.deleteUser)
  .post('/users/:userId/borrow/:bookId', UserBorrowedBookController.borrowBook)
  .post('/users/:userId/return/:bookId', UserBookValidation.validateReturn, UserBorrowedBookController.returnBook);

export default router;