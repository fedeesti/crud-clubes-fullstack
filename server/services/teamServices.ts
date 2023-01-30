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
}
