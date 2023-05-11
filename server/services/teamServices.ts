import teams from '../../data/equipos.db.json';
import { Team } from '../types/team';
import CustomError from '../models/customError';

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

  async createTeam(teamData: Team) {
    const newTeam = { ...teamData };
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
