import { Link } from 'react-router-dom';
import { useGetTeams } from '../hooks/useGetTeams';
import { TeamItem } from '../components/TeamItem';
import { Team } from '../types';

export function TeamsTable(): JSX.Element {
  const { teams }: { teams: Team[] } = useGetTeams();

  return (
    <>
      <header className="pt-24 text-center">
        <h1 className="text-gray-800 text-5xl font-black">CRUD-Clubes</h1>
      </header>
      <section className="flex flex-col items-center justify-center min-h-screen py-10">
        <p data-test="amount-of-teams" className="text-gray-950 font-medium" data-cy="team-table-title">
          There are {teams.length} teams
          <span className="px-2 py-0.5 ml-1 bg-gold rounded text-white hover:bg-gold/80">
            <Link data-cy="home-btn-add-team" to="/teams/add">
              ADD
            </Link>
          </span>
        </p>
        <div className="flex flex-col mt-6 w-min">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden sm:rounded-lg">
                <table className="min-w-full table-fixed text-sm text-gray-400" data-cy="teams-table">
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
                    {teams.map((team) => {
                      return (
                        <TeamItem
                          key={team.id}
                          id={team.id}
                          logo={team.crestUrl}
                          country={team.area.name}
                          name={team.name}
                          shortName={team.shortName}
                        />
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
