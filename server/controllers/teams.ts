import { Request, Response } from 'express';
import TeamsService from '../services/teamServices';
import { Team } from '../types/team';

const service = new TeamsService();

export async function getTeams(_req: Request, res: Response) {
  try {
    const teams: Team[] = await service.findTeams();
    return res.json(teams);
  } catch (err) {
    return res.status(500).json({
      message: 'Server internal error',
    });
  }
}

export async function getTeamById(req: Request, res: Response) {
  const id = Number(req.params.id);

  if (!id) return res.status(400).json({ message: 'Bad Request' });

  try {
    const team: Team | undefined = await service.findTeam(id);

    if (!team)
      return res.status(404).json({
        message: 'Team not found',
      });

    return res.json(team);
  } catch (err) {
    return res.status(500).json({
      message: 'Server internal error',
    });
  }
}
