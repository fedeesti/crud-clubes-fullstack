import { Request, Response, NextFunction } from 'express';
import TeamsService from '../services/teamServices';
import { Team } from '../types/team';
import CustomError from '../models/customError';

const service = new TeamsService();

export async function getTeams(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const teams: Team[] = await service.findTeams();
    res.json(teams);
  } catch (err) {
    next(err);
  }
}

export async function getTeamById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = Number(req.params.id);
    if (!id) throw new CustomError(400, 'Bad Request');

    const team: Team | undefined = await service.findTeam(id);

    res.json(team);
  } catch (err) {
    next(err);
  }
}

export async function deleteTeamById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = Number(req.params.id);
    if (!id) throw new CustomError(400, 'Bad Request');

    const teamDelete = await service.deleteTeam(id);

    res.status(200).json(teamDelete);
  } catch (err) {
    next(err);
  }
}
