import { Router } from 'express';
import { checkSchema } from 'express-validator';
import { createTeam, deleteTeamById, getTeamById, getTeams } from '../controllers/teams';
import { idSchema } from '../schemas/team.schema';
import { validatorHandler } from '../middlewares/validator.handler';

const router: Router = Router();

router.route('/').get(getTeams).post(createTeam);

router
  .route('/:id')
  .get(checkSchema(idSchema), validatorHandler, getTeamById)
  .delete(checkSchema(idSchema), validatorHandler, deleteTeamById);

export default router;
