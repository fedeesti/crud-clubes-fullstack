import express, { Express } from 'express';
import apiRouter from './routes/index.routes';

export function createApp() {
  const app: Express = express();

  app.use(express.json());
  app.use('/api/v1', apiRouter);

  return app;
}
