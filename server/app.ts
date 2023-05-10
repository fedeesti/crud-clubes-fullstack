import express, { Express } from 'express';
import apiRouter from './routes/index.routes';
import { errorHandler } from './middlewares/error.handler';

export function createApp() {
  const app: Express = express();

  app.use(express.json());
  app.use('/api/v1', apiRouter);
  app.use(errorHandler);

  return app;
}
