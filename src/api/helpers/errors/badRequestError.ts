import { BaseError } from './baseError';

export class BadRequestError extends BaseError {
  constructor(message: string) {
    super({
      status: 400,
      message,
      type: 'BadRequestError',
    });
  }
}
