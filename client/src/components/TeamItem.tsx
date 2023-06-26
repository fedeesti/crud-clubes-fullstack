import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DeleteTeam } from '../pages/DeleteTeam';
import useWindowDimension from '../hooks/useWindowSize';

export function TeamItem({
  id,
  logo,
  country,
  name,
  shortName,
}: {
  id: number;
  logo: string;
  country: string;
  name: string;
  shortName: string;
}): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const { screenSize } = useWindowDimension();

  return (
    <tr className="odd:bg-black odd:bg-opacity-20">
      <td className="flex px-6 py-4 whitespace-nowrap items-center">
        <img className="w-5" src={logo} alt={`logo-${shortName}`} data-cy="team-row-img" />
        <span className="ml-2 font-medium" data-cy="team-row-name">
          {screenSize.width > 600 ? name : shortName}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap" data-cy="team-row-country">
        {country}
      </td>
      <td className="px-6 py-4 whitespace-nowrap hidden md:block" data-cy="team-row-actions">
        <Link to={`/teams/${id}`} className="px-1 hover:text-gray-100" data-cy="team-actions-watch">
          Watch
        </Link>
        <Link to={`/teams/${id}/edit`} className="px-1 hover:text-gray-100" data-cy="team-actions-edit">
          Edit
        </Link>
        <button onClick={() => setIsOpen(true)} className="px-1 hover:text-red-500" data-cy="team-actions-delete">
          Delete
        </button>
      </td>
      <td className="py-3 px-6 text-center block md:hidden" data-cy="row-actions-mobile-icons">
        <div className="flex item-center justify-center">
          <div className="w-4 mr-2 hover:text-gray-100 hover:scale-110">
            <Link to={`/teams/${id}`} data-cy="row-actions-mobile-icons-watch">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </Link>
          </div>
          <div className="w-4 mr-2 hover:text-gray-100 hover:scale-110">
            <Link to={`/teams/${id}/edit`} data-cy="row-actions-mobile-icons-edit">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </Link>
          </div>
          <div className="w-4 mr-2 hover:text-red-500 hover:scale-110">
            <button className="w-4 h-4" onClick={() => setIsOpen(true)} data-cy="row-actions-mobile-icons-delete">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
            {isOpen && <DeleteTeam logo={logo} name={shortName} id={id} showModal={() => setIsOpen(false)} />}
          </div>
        </div>
      </td>
    </tr>
  );
}
