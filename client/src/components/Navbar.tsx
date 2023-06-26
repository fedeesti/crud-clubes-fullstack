import { NavLink, Link } from 'react-router-dom';
import { useNavbarExpanded } from '../hooks/useNavbarExpanded';
import logoSvg from '../img/soccer-svgrepo-com.svg';
import { useSearchBar } from '../hooks/useSearchBar';

export function Navbar(): JSX.Element {
  const { isMenuExpanded, isSearchExpanded, toggleMenuExpanded, toggleSearchExpanded, menuRef, searchMobileRef } =
    useNavbarExpanded();
  const { filteredTeam, keyTeam, handleChange, refSearch, resetFilteredTeam } = useSearchBar();

  return (
    <nav className="border-gray-200 bg-gray-900 w-full fixed">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink to="/" className="flex items-center" data-cy="navbar-logo-container">
          <img src={logoSvg} className="h-8 mr-2" alt="CRUD-Clubes Logo" />
          <span className="self-center text-lg md:text-2xl font-semibold whitespace-nowrap text-white">
            CRUD-Clubes
          </span>
        </NavLink>
        <div className="flex md:order-2" id="nav-search-team">
          <button
            type="button"
            data-cy="nav-btn-search-icon"
            onClick={toggleSearchExpanded}
            className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Search</span>
          </button>
          <div className="relative hidden md:block" data-cy="navbar-search">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Search icon</span>
            </div>
            <input
              type="text"
              data-cy="nav-search-input"
              value={keyTeam}
              ref={refSearch}
              onChange={handleChange}
              className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
              placeholder="Search team..."
            />
            {filteredTeam.length !== 0 && (
              <div
                data-cy="search-team-list"
                className="absolute mt-1 w-full p-2 bg-white shadow-lg rounded-bl rounded-br max-h-56 overflow-y-auto"
              >
                <ul data-cy="nav-search-list-team">
                  {filteredTeam.map((team) => {
                    return (
                      <li key={team.id} className="cursor-pointer hover:bg-black hover:bg-opacity-10 p-2">
                        <Link to={`/teams/${team.id}`} onClick={resetFilteredTeam}>
                          {team.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
          <button
            type="button"
            data-cy="nav-btn-menu-icon"
            onClick={toggleMenuExpanded}
            ref={menuRef}
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div className="flex items-center justify-between w-full md:w-auto md:order-1">
          <div
            data-cy="nav-search-mobile"
            ref={searchMobileRef}
            className={`relative mt-3 ${isSearchExpanded ? 'm-auto' : 'hidden'} md:hidden`}
          >
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              data-cy="nav-search-input-mobile"
              value={keyTeam}
              ref={refSearch}
              onChange={handleChange}
              className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
              placeholder="Search team..."
            />
            {filteredTeam.length !== 0 && (
              <div
                data-cy="search-team-list-mobile"
                className="absolute mt-1 w-full p-2 bg-white shadow-lg rounded-bl rounded-br max-h-56 overflow-y-auto"
              >
                <ul data-cy="nav-search-list-team-mobile">
                  {filteredTeam.map((team) => {
                    return (
                      <li key={team.id} className="cursor-pointer hover:bg-black hover:bg-opacity-10 p-2">
                        <Link to={`/teams/${team.id}`} onClick={resetFilteredTeam}>
                          {team.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
          <ul
            className={`${
              isMenuExpanded ? 'w-full' : 'hidden'
            } md:flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-gray-900`}
            data-cy="navbar-menu"
          >
            <li>
              <NavLink
                to="/"
                data-cy="navbar-menu-home"
                className={({ isActive }: { isActive: boolean }): string => {
                  return `block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-800 md:hover:bg-transparent md:hover:text-teal-200 md:p-0 ${
                    isActive ? 'md:text-teal-200' : ''
                  }`;
                }}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/teams/add"
                data-cy="navbar-menu-create-team"
                className={({ isActive }: { isActive: boolean }): string => {
                  return `block py-2 pl-3 pr-4 text-white rounded hover:bg-gray-800 md:hover:bg-transparent md:hover:text-teal-200 md:p-0 ${
                    isActive ? 'md:text-teal-200' : ''
                  }`;
                }}
              >
                Create team
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
