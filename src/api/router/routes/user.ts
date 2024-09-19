import express from 'express';
// const validate = require('../../helpers/validate');
var router = express.Router();

/**
 * CONTROLLER
 */
import {
    getAllUsers,
  } from '../controllers/userController';

import { UserBookValidation } from '../../helpers/validations/userBookValidation';
import { UserValidation } from '../../helpers/validations/userValidation';

/**
 * ROUTES
 */
// router.get('/', [validate], UserController.getAllUsers);
router
  .get('/', getAllUsers)

export default router;