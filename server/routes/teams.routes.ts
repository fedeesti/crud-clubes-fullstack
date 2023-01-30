import { Router } from 'express';
import { getTeamById, getTeams } from '../controllers/teams';

const router: Router = Router();

router.route('/').get(getTeams);

router.route('/:id').get(getTeamById);

export default router;
