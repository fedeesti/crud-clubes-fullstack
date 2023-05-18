import teams from '../../data/equipos.db.json';
import { CreateTeamResponse, Team } from '../types/team';
import CustomError from '../models/customError';
import { mapPostResponseToTeam } from '../models/team.mapper';

export default class TeamServices {
  teams: Team[];

  constructor() {
    this.teams = teams;
  }

  async findTeams() {
    return this.teams;
  }

  async findTeam(id: number) {
    const team = this.teams.find((team) => team.id === id);

    if (!team) throw new CustomError(404, 'Team not found');

    return team;
  }

  async createTeam(teamData: CreateTeamResponse) {
    const newTeam = mapPostResponseToTeam(teamData);
    this.teams.push(newTeam);

    return 'The team has been created successfully';
  }

  async deleteTeam(id: number) {
    const index = this.teams.findIndex((team) => team.id === id);

    if (index === -1) throw new CustomError(404, 'Team not found');

    this.teams.splice(index, 1);

    return `the team with ID: ${id} has been removed`;
  }
}
