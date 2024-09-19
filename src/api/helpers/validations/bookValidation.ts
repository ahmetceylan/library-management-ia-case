import * as Joi from 'joi';
import { NextFunction, Request, Response } from 'express';

export class BookValidation {
  private static bookSchema = Joi.object({
    name: Joi.string().required(),
  });
  public static validateBook = (req: Request, res: Response, next: NextFunction) => {
    const { body: book } = req;

    if (!book) throw new Error('No book specified.');

    const { error, value } = this.bookSchema.validate(book);

    if (error) throw new Error(error.message);

    next();
  };
}
