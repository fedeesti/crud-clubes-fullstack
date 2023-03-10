import { Router } from 'express';
import teamsRouter from './teams.routes';

const router: Router = Router();

router.use('/teams', teamsRouter);

export default router;
