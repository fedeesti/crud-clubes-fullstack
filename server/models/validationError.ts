import { FieldValidationError } from 'express-validator';
import CustomError from './customError';

export default class ValidationError extends CustomError {
  errorData: object[];

  constructor(errors: FieldValidationError[]) {
    super(400, 'Bad Request');
    this.errorData = errors.map((err) => {
      return { field: err.path, message: err.msg };
    });
  }
}
