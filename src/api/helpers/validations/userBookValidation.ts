import * as Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import { ValidationError } from '../errors/validationError';

export class UserBookValidation {
  private static userBookSchema = Joi.object({
    score: Joi.number().min(1).max(10).required(),
  });

  public static validateReturn = (req: Request, res: Response, next: NextFunction) => {
    const { body: userBook } = req;

    if (!userBook) throw new ValidationError('No user book specified.');

    const { error } = this.userBookSchema.validate(userBook);

    if (error) throw new Error(error.message);

    next();
  };
}
