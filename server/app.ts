import express, { Express, Response, Request } from 'express';
import { Team } from './types/team';
import teams from '../data/equipos.db.json';

export const app: Express = express();

app.use(express.json());

app.get('/api/v1/teams', (_req: Request, res: Response) => {
  res.send(teams);
});

app.get('/api/v1/teams/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!id) return res.status(400).json({ message: 'Bad Request' });

  try {
    const team: Team | undefined = teams.find((team) => team.id === id);

    if (!team) return res.status(404).json({ message: 'Team not found' });

    return res.json(team);
  } catch (err) {
    return res.status(500).json({ message: 'Internal server errror' });
  }
});
