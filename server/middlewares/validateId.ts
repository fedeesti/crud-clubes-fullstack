import { Request, Response, NextFunction } from 'express';
import teams from '../../data/equipos.db.json';
import CustomError from '../models/customError';

export function validateId(req: Request, _res: Response, next: NextFunction) {
  const id = Number(req.params.id);

  const index = teams.findIndex((team) => team.id === id);

  if (index === -1) throw new CustomError(404, 'Team not found');

  next();
}
