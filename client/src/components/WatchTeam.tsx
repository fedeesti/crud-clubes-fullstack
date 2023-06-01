import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useWindowDimension from '../hooks/useWindowDimension';
import { Team } from '../types';

type TeamViewer = Omit<Team, 'id' | 'lastUpdated'>;

export function WatchTeam() {
  const { id } = useParams();

  const [team, setTeam] = useState<TeamViewer>();
  const { screenSize } = useWindowDimension();

  useEffect(() => {
    findTeam(id);
  }, [id]);

  const findTeam = async (id: string | undefined) => {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/v1/teams/${id}`);
      setTeam(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <header className="bg-banner-team bg-bottom min-w-full pt-24 pb-8 grid grid-cols-team-view" data-cy="team-header">
        <img src={team?.crestUrl} alt={`logo-${team?.shortName}`} className="ml-4 w-52 h-52" />
        <div className="flex flex-col justify-center" data-cy="team-title">
          <h1 className="text-white text-6xl font-bold uppercase">
            {screenSize.width < 400 ? team?.shortName : team?.name}
          </h1>
          <span className="text-white pl-4">{team?.tla}</span>
        </div>
      </header>

      <section className="w-full my-8 rounded md:rounded-lg p-4">
        <div className="w-80 md:w-full bg-white p-8 shadow-section rounded-3xl" data-cy="team-section-container">
          <h1 className="p-4 text-gray-800 text-3xl font-bold" data-cy="team-data-title">
            Overview
          </h1>
          <div
            className="p-6 grid gap-4 grid-cols-2 md:grid-cols-3 grid-rows-auto-fit items-center"
            data-cy="team-data-container"
          >
            {team?.shortName && (
              <div className="p-4">
                <h1 className="text-gray-800 text-xl font-medium">Short name</h1>
                <p className=" pl-4 font-poppins font-medium">{team?.shortName}</p>
              </div>
            )}

            {team?.area.name && (
              <div className="p-4">
                <h1 className="text-gray-800 text-xl font-medium">Country</h1>
                <p className="pl-4 font-poppins font-medium">{team?.area.name}</p>
              </div>
            )}

            {team?.founded && (
              <div className="p-4">
                <h1 className="text-gray-800 text-xl font-medium">Founded</h1>
                <p className="pl-4 font-poppins font-medium">{team?.founded}</p>
              </div>
            )}

            {team?.venue && (
              <div className="p-4">
                <h1 className="text-gray-800 text-xl font-medium">Stadium</h1>
                <p className="pl-4 font-poppins font-medium">{team?.venue}</p>
              </div>
            )}

            {team?.clubColors && (
              <div className="p-4">
                <h1 className="text-gray-800 text-xl font-medium">Club Colors</h1>
                <p className="pl-4 font-poppins font-medium">{team?.clubColors}</p>
              </div>
            )}

            {team?.address && (
              <div className="p-4">
                <h1 className="text-gray-800 text-xl font-medium">Address</h1>
                <p className="pl-4 font-poppins font-medium">{team?.address}</p>
              </div>
            )}

            {team?.website && (
              <div className="p-4">
                <h1 className="text-gray-800 text-xl font-medium">Website</h1>
                <p className="pl-4 font-poppins font-medium">{team?.website}</p>
              </div>
            )}

            {team?.phone && (
              <div className="p-4">
                <h1 className="text-gray-800 text-xl font-medium">Phone</h1>
                <p className="pl-4 font-poppins font-medium">{team?.phone}</p>
              </div>
            )}

            {team?.email && (
              <div className="p-4">
                <h1 className="text-gray-800 text-xl font-medium">Email</h1>
                <p className="pl-4 font-poppins font-medium">{team?.email}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
