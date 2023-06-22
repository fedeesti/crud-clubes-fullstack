import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { TeamsTable } from './pages/TeamsTable';
import { WatchTeam } from './pages/WatchTeam';
import { CreateTeam } from './pages/CreateTeam';
import { UpdateTeam } from './pages/UpdateTeam';

function App(): JSX.Element {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<TeamsTable />} />
          <Route path="/teams/:id" element={<WatchTeam />} />
          <Route path="/teams/add" element={<CreateTeam />} />
          <Route path="/teams/:id/edit" element={<UpdateTeam />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
