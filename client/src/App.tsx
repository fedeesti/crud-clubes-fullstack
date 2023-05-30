import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
      <Router>
        <Navbar />
        <header className="pt-24 text-center">
          <h1 className="text-gray-800 text-5xl font-bold">CRUD-Clubes</h1>
        </header>
        <Routes>
          <Route path="/" element={<TeamsTable teams={teams} />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
