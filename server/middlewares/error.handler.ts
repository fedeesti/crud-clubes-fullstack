/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import CustomError from '../models/customError';

export function errorHandler(err: Error | CustomError, _req: Request, res: Response, _next: NextFunction) {
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
