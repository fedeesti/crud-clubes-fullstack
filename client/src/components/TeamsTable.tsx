import { Link } from 'react-router-dom';
import { Team } from '../types';
import { useAxiosFetch } from '../hooks/useAxiosFetch';

type TeamPreview = Pick<Team, 'name' | 'shortName' | 'area' | 'id' | 'crestUrl'>;

export function TeamsTable() {
  const { teams }: { teams: Team[] } = useAxiosFetch('/teams/');

  return (
    <>
      <header className="pt-24 text-center">
        <h1 className="text-gray-800 text-5xl font-black">CRUD-Clubes</h1>
      </header>
      <section className="flex flex-col items-center justify-center min-h-screen py-10">
        <span data-test="amount-of-teams" className="text-gray-950 font-medium" data-cy="team-table-title">
          There are {teams.length} teams
        </span>
        <div className="flex flex-col mt-6">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden sm:rounded-lg">
                <table className="min-w-full text-sm text-gray-400" data-cy="teams-table">
                  <thead className="bg-gray-800 text-xs uppercase font-medium" data-cy="teams-table-header">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left tracking-wider" data-cy="teams-table-header-name">
                        Team name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left tracking-wider"
                        data-cy="teams-table-header-country"
                      >
                        Country
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center tracking-wider"
                        data-cy="teams-table-header-actions"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-800" data-cy="teams-table-body">
                    {teams.map((team: TeamPreview) => {
                      return (
                        <tr className="odd:bg-black odd:bg-opacity-20" key={team.id}>
                          <td className="flex px-6 py-4 whitespace-nowrap">
                            <img
                              className="w-5"
                              src={team.crestUrl}
                              alt={`logo-${team.shortName}`}
                              data-cy="team-row-img"
                            />
                            <span className="ml-2 font-medium" data-cy="team-row-name">
                              {team.name}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap" data-cy="team-row-country">
                            {team.area.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap" data-cy="team-row-actions">
                            <Link to={`/teams/${team.id}`} className="px-1">
                              Watch
                            </Link>
                            <Link to="#" className="px-1">
                              Edit
                            </Link>
                            <Link to="#" className="px-1">
                              Delete
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
