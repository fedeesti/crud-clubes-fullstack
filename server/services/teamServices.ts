import teams from '../../data/equipos.db.json';
import { Team } from '../types/team';

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

    return team;
  }

  async deleteTeam(id: number) {
    const index = this.teams.findIndex((team) => team.id === id);

    if (index === -1) throw new Error('Team not found');

    this.teams.splice(index, 1);

    return `the team with ID: ${id} has been removed`;
  }
}
