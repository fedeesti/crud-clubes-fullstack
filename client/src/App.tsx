import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { TeamsTable } from './components/TeamsTable';
import { WatchTeam } from './components/WatchTeam';
import { DeleteTeam } from './components/DeleteTeam';

function App() {
  return (
    <main>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<TeamsTable />} />
          <Route path="/teams/:id" element={<WatchTeam />} />
          <Route path="/teams/:id/delete" element={<DeleteTeam />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
