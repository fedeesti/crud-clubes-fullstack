import express, { Express } from 'express';
import apiRouter from './routes/index.routes';

export const app: Express = express();

app.use(express.json());
app.use('/api/v1', apiRouter);
