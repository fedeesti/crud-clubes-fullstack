import { Router } from 'express';
import { checkSchema } from 'express-validator';
import { createTeam, deleteTeamById, getTeamById, getTeams, updateTeamById } from '../controllers/teams';
import { idSchema, createTeamSchema, updateTeamSchema } from '../schemas/team.schema';
import { validatorHandler } from '../middlewares/validator.handler';

const router: Router = Router();

router.route('/').get(getTeams).post(checkSchema(createTeamSchema), validatorHandler, createTeam);

router
  .route('/:id')
  .get(checkSchema(idSchema), validatorHandler, getTeamById)
  .put(checkSchema(updateTeamSchema), validatorHandler, updateTeamById)
  .delete(checkSchema(idSchema), validatorHandler, deleteTeamById);

export default router;
