import { Router } from 'express';
import { deleteTeamById, getTeamById, getTeams } from '../controllers/teams';

const router: Router = Router();

router.route('/').get(getTeams);

router.route('/:id').get(getTeamById).delete(deleteTeamById);

export default router;
