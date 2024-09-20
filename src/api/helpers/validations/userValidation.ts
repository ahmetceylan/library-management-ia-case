import * as Joi from 'joi';
import { NextFunction, Request as Req, Response as Res } from 'express';
import { ValidationError } from '../errors/validationError';

export class UserValidation {
  private static userSchema = Joi.object({
    name: Joi.string().required(),
  });

  public static validateUser = (req: Req, res: Res, next: NextFunction) => {
    const { body: user } = req;

    if (!user) throw new ValidationError('No user specified.');

    const { error, value } = this.userSchema.validate(user);

    if (error) throw new Error(error.message);

    next();
  };
}
