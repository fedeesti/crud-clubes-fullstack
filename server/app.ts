import express, { Express, Response, Request } from 'express';
import teams from '../data/equipos.db.json';

export const app: Express = express();

app.use(express.json());

app.get('/api/v1/teams', (_req: Request, res: Response) => {
  res.send(teams);
});
