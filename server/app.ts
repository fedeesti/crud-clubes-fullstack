import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import apiRouter from './routes/index.routes';
import { errorHandler } from './middlewares/error.handler';

export function createApp() {
  const app: Express = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use('/api/v1', apiRouter);
  app.use(errorHandler);

  return app;
}
