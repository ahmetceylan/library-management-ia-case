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
  .get('/', UserController.getAllUsers)
  .post('/', UserValidation.validateUser, UserController.insertUser)
  .get('/:userId', UserController.getUserById)
  .put('/:userId', UserController.updateUser)
  .delete('/:userId', UserController.deleteUser)
  .post('/:userId/borrow/:bookId', UserBorrowedBookController.borrowBook)
  .post('/:userId/return/:bookId', UserBookValidation.validateReturn, UserBorrowedBookController.returnBook);

export default router;