import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DeleteTeam } from '../pages/DeleteTeam';

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
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <tr className="odd:bg-black odd:bg-opacity-20">
      <td className="flex px-6 py-4 whitespace-nowrap items-center">
        <img className="w-5" src={logo} alt={`logo-${shortName}`} data-cy="team-row-img" />
        <span className="ml-2 font-medium" data-cy="team-row-name">
          {name}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap" data-cy="team-row-country">
        {country}
      </td>
      <td className="px-6 py-4 whitespace-nowrap" data-cy="team-row-actions">
        <Link to={`/teams/${id}`} className="px-1" data-cy="team-actions-watch">
          Watch
        </Link>
        <Link to="#" className="px-1" data-cy="team-actions-edit">
          Edit
        </Link>
        <button onClick={() => setIsOpen(true)} className="px-1" data-cy="team-actions-delete">
          Delete
        </button>
        {isOpen && <DeleteTeam logo={logo} name={shortName} id={id} showModal={() => setIsOpen(false)} />}
      </td>
    </tr>
  );
}
