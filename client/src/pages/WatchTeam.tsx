import { useParams, Link } from 'react-router-dom';
import useWindowSize from '../hooks/useWindowSize';
import useGetTeam from '../hooks/useGetTeam';

export function WatchTeam(): JSX.Element {
  const { id } = useParams();
  const { screenSize } = useWindowSize();
  const { team } = useGetTeam(id);

  return (
    <>
      <header
        id="header-team-page"
        className="bg-center bg-cover bg-no-repeat min-w-full pt-24 pb-8 grid grid-cols-sm-minmax md:grid-cols-md-minmax gap-1 md:gap-5"
        data-cy="team-header"
      >
        <img src={team?.crestUrl} alt={`logo-${team?.shortName}`} className="ml-2 md:ml-4 w-32 h-32 md:w-52 md:h-52" />
        <div className="flex flex-col justify-center" data-cy="team-title">
          <h1 className="text-white text-3xl md:text-6xl font-bold uppercase">
            {screenSize.width < 400 ? team?.shortName : team?.name}
          </h1>
          <span className="text-white pl-4">{team?.tla}</span>
        </div>
      </header>

      <section className="w-full my-8 rounded md:rounded-lg p-4">
        <div className="w-full bg-white p-2 md:p-8 shadow-section rounded-3xl" data-cy="team-section-container">
          <header>
            <h2 className="p-4 text-gray-800 text-3xl font-bold" data-cy="team-data-title">
              Overview
            </h2>
          </header>
          <section className="flex flex-col md:flex-row md:gap-8">
            <iframe
              className="rounded-lg mx-4 md:my-6 w-11/12 h-60 md:h-80 md:w-98"
              loading="lazy"
              data-cy="team-address-map"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/place?key=${
                import.meta.env.VITE_GOOGLE_API_KEY
              }&q=${team?.address?.split(' ').join('+')}`}
            ></iframe>
            <div
              className="pt-2 md:pt-4 md:p-6 grid gap-4 grid-cols-2 md:grid-cols-3 grid-rows-auto-fit items-center break-words"
              data-cy="team-data-container"
            >
              {team?.shortName && (
                <div className="p-4">
                  <h1 className="text-gray-800 text-xl font-medium">Short name</h1>
                  <p className=" pl-4 font-manrope font-medium">{team?.shortName}</p>
                </div>
              )}

              {team?.area.name && (
                <div className="p-4">
                  <h1 className="text-gray-800 text-xl font-medium">Country</h1>
                  <p className="pl-4 font-manrope font-medium">{team?.area.name}</p>
                </div>
              )}

              {team?.founded && (
                <div className="p-4">
                  <h1 className="text-gray-800 text-xl font-medium">Founded</h1>
                  <p className="pl-4 font-manrope font-medium">{team?.founded}</p>
                </div>
              )}

              {team?.venue && (
                <div className="p-4">
                  <h1 className="text-gray-800 text-xl font-medium">Stadium</h1>
                  <p className="pl-4 font-manrope font-medium">{team?.venue}</p>
                </div>
              )}

              {team?.clubColors && (
                <div className="p-4">
                  <h1 className="text-gray-800 text-xl font-medium">Club Colors</h1>
                  <p className="pl-4 font-manrope font-medium">{team?.clubColors}</p>
                </div>
              )}

              {team?.address && (
                <div className="p-4">
                  <h1 className="text-gray-800 text-xl font-medium">Address</h1>
                  <p className="pl-4 font-manrope font-medium">{team?.address}</p>
                </div>
              )}

              {team?.website && (
                <div className="p-4">
                  <h1 className="text-gray-800 text-xl font-medium">Website</h1>
                  <p className="pl-2 md:pl-4 font-manrope font-medium">{team?.website}</p>
                </div>
              )}

              {team?.phone && (
                <div className="p-4">
                  <h1 className="text-gray-800 text-xl font-medium">Phone</h1>
                  <p className="pl-4 font-manrope font-medium">{team?.phone}</p>
                </div>
              )}

              {team?.email && (
                <div className="p-4">
                  <h1 className="text-gray-800 text-xl font-medium">Email</h1>
                  <p className="pl-4 font-manrope font-medium">{team?.email}</p>
                </div>
              )}
            </div>
          </section>
          <footer className="w-full my-2 h-12">
            <Link to={`/teams/${team?.id}/edit`}>
              <button
                data-cy="watch-team-btn-edit"
                className="px-5 h-full w-full md:w-80 text-sm font-bold text-center border border-gold text-gold bg-white rounded-lg hover:text-white hover:bg-gold"
              >
                Edit team
              </button>
            </Link>
          </footer>
        </div>
      </section>
    </>
  );
}
