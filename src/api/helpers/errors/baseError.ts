import { BaseErrorOptions } from "./baseErrorOptions";

export class BaseError extends Error {
  status: number;
  message: string;
  type: string;

  constructor(params: BaseErrorOptions) {
    super(params.message);
    this.status = params.status;
    this.message = params.message;
    this.type = params.type;
  }
}
