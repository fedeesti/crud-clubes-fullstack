import { Request, Response, NextFunction } from 'express';
import TeamsService from '../services/teamServices';
import { Team } from '../types/team';

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
    const team: Team | undefined = await service.findTeam(id);

    res.json(team);
  } catch (err) {
    next(err);
  }
}

export async function createTeam(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const newTeam = await service.createTeam(req.body);

    res.status(201).json(newTeam);
  } catch (err) {
    next(err);
  }
}

export async function updateTeamById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = Number(req.params.id);
    const teamUpdate = await service.updateTeam(id, req.body);

    res.status(200).json(teamUpdate);
  } catch (err) {
    next(err);
  }
}

export async function deleteTeamById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = Number(req.params.id);
    const teamDelete = await service.deleteTeam(id);

    res.status(200).json(teamDelete);
  } catch (err) {
    next(err);
  }
}
