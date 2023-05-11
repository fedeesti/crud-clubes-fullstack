import { Router } from 'express';
import { createTeam, deleteTeamById, getTeamById, getTeams } from '../controllers/teams';

const router: Router = Router();

router.route('/').get(getTeams).post(createTeam);

router.route('/:id').get(getTeamById).delete(deleteTeamById);

export default router;
