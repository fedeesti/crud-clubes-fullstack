import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { TeamsTable } from './pages/TeamsTable';
import { WatchTeam } from './pages/WatchTeam';
import { CreateTeam } from './pages/CreateTeam';

function App() {
  return (
    <main>
      <Navbar />
      <Routes>
        <Route path="/" element={<TeamsTable />} />
        <Route path="/teams/:id" element={<WatchTeam />} />
        <Route path="/teams/add" element={<CreateTeam />} />
      </Routes>
    </main>
  );
}

export default App;
