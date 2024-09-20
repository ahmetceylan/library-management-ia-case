import { BaseError } from './baseError';

export class NotFoundError extends BaseError {
  message: string;

  constructor(message: string) {
    super({
      status: 404,
      message,
      type: 'NotFoundError.name',
    });
    this.message = message;
  }
}
