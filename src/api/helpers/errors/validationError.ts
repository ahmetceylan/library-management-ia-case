import { ValidationError as ExpressValidationError } from 'express-validator';
import { BaseError } from './baseError';

export class ValidationError extends BaseError {
  errors: ExpressValidationError[];

  constructor(errors: ExpressValidationError[]) {
    super({
      message: 'Validation error occured',
      status: 400,
      type: ValidationError.name,
    });
    this.errors = errors;
  }
}
