import { CreateTeamResponse, Team } from '../types/team';
import { findCountryId, generateId } from '../utils/team.utils';

export function mapPostResponseToTeam(teamData: CreateTeamResponse | Team): Team {
  const newTeam = {
    id: teamData.id ? teamData.id : generateId(),
    area: {
      id: findCountryId(teamData.area.name),
      name: teamData.area.name,
    },
    name: teamData.name,
    shortName: teamData.shortName,
    tla: teamData.tla.toUpperCase(),
    crestUrl: teamData.crestUrl,
    address: teamData.address ? teamData.address : null,
    phone: teamData.phone ? teamData.phone : null,
    website: teamData.website ? teamData.website : null,
    email: teamData.email ? teamData.email : null,
    founded: teamData.founded ? teamData.founded : null,
    clubColors: teamData.clubColors,
    venue: teamData.venue ? teamData.venue : null,
    lastUpdated: new Date().toISOString(),
  };

  return newTeam;
}
