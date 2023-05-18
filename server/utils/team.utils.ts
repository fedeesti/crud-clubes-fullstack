import teams from '../../data/equipos.db.json';
import competitions from '../../data/competitions.json';

export function generateId(): number {
  const allTeamsId = teams.map((team) => team.id);
  const newId = Math.max(...allTeamsId) + 1;

  if (allTeamsId.includes(newId)) {
    generateId();
  }

  return newId;
}

export function findCountryId(country: string): number {
  for (let i = 0; i <= competitions.length; i++) {
    if (competitions[i].country === country) {
      return competitions[i].id;
    }
  }
  return 2267;
}
