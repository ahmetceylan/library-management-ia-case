
import { BaseError } from './baseError';

export class ValidationError extends BaseError {
  error: string;

  constructor(message: string) {
    super({
      message,
      status: 400,
      type: ValidationError.name,
    });
    this.error = message;
  }
}
