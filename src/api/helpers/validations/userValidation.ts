import * as Joi from 'joi';
import { NextFunction, Request as Req, Response as Res } from 'express';

export class UserValidation {
  private static userSchema = Joi.object({
    name: Joi.string().required(),
  });
  public static validateUser = (req: Req, res: Res, next: NextFunction) => {
    const { body: user } = req;

    if (!user) throw new Error('No user specified.');

    const { error, value } = this.userSchema.validate(user);

    if (error) throw new Error(error.message);

    next();
  };
}
