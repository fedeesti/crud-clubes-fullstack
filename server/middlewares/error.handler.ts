/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import CustomError from '../models/customError';
import ValidationError from '../models/validationError';

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ValidationError) {
    return res.status(err.status).json({
      status: err.status,
      message: err.message,
      data: err.errorData,
    });
  }

  if (err instanceof CustomError) {
    return res.status(err.status).json({
      status: err.status,
      message: err.message,
    });
  }

  return res.status(500).json({
    status: 500,
    message: 'Internal server error',
  });
}
