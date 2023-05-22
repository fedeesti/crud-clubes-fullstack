import teams from '../../data/equipos.db.json';
import { CreateTeamResponse, Team } from '../types/team';
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

    return team;
  }

  async createTeam(teamData: CreateTeamResponse) {
    const newTeam = mapPostResponseToTeam(teamData);
    this.teams.push(newTeam);

    return 'The team has been created successfully';
  }

  async updateTeam(id: number, fieldsToUpdate: Partial<Team>) {
    const index = this.teams.findIndex((team) => team.id === id);
    const team = this.teams[index];

    const updateTeam = mapPostResponseToTeam({ ...team, ...fieldsToUpdate });
    this.teams[index] = updateTeam;

    return `the team with ID: ${id} has been updated`;
  }

  async deleteTeam(id: number) {
    const index = this.teams.findIndex((team) => team.id === id);

    this.teams.splice(index, 1);

    return `the team with ID: ${id} has been removed`;
  }
}
