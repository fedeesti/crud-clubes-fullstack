import { Router } from 'express';
import { checkSchema } from 'express-validator';
import { createTeam, deleteTeamById, getTeamById, getTeams, updateTeamById } from '../controllers/teams';
import { createTeamSchema, updateTeamSchema } from '../schemas/team.schema';
import { validatorSchema } from '../middlewares/validatorSchema';
import { validateId } from '../middlewares/validateId';

const router: Router = Router();

router.route('/').get(getTeams).post(checkSchema(createTeamSchema), validatorSchema, createTeam);

router
  .route('/:id')
  .get(validateId, getTeamById)
  .put(validateId, checkSchema(updateTeamSchema), validatorSchema, updateTeamById)
  .delete(validateId, deleteTeamById);

export default router;
