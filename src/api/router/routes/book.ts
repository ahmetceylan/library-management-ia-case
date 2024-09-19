import express from 'express';
import {
  getAllBooks,
} from '../controllers/bookController';
import { BookValidation } from '../../helpers/validations/bookValidation';
const router = express.Router();

router
  .get('/', getAllBooks)

export default router;
