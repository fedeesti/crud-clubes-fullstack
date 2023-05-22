import { Request, Response, NextFunction } from 'express';
import { Result, validationResult } from 'express-validator';
import ValidationError from '../models/validationError';

export function validatorSchema(req: Request, _res: Response, next: NextFunction) {
  try {
    const result: Result = validationResult(req);
    if (!result.isEmpty()) {
      throw new ValidationError(result.array());
    }
    next();
  } catch (e) {
    next(e);
  }
}
