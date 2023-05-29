import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { TeamsTable } from './components/TeamsTable';
import { getAllTeams } from './services/api';
import { Team } from './types';

function App() {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    const fetchAllTeams = async () => {
      try {
        const { data } = await getAllTeams();
        setTeams(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAllTeams();
  }, []);

  return (
    <main>
      <Navbar />
      <header className="pt-24 text-center">
        <h1 className="text-gray-800 text-5xl font-bold">CRUD-Clubes</h1>
      </header>
      <TeamsTable teams={teams} />
    </main>
  );
}

export default App;

/*
CREAR LOS TEST PARA COMPLETAR EL TICKET
 OPCIONAL:
  - Acomodar el useEffect
  - types.d.ts se repite en fron y back, unificarlos
  - Assets tiene img, cambiar el nombre
*/
