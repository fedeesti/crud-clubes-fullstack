import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { TeamsTable } from './pages/TeamsTable';
import { WatchTeam } from './pages/WatchTeam';

function App() {
  return (
    <main>
      <Navbar />
      <Routes>
        <Route path="/" element={<TeamsTable />} />
        <Route path="/teams/:id" element={<WatchTeam />} />
      </Routes>
    </main>
  );
}

export default App;
