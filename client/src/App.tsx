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

/*
Corregir los test sobre navegar entre páginas (ya sea por link o navbar)
  - Se repiten en varios describe, crear uno aparte para testear solamente ese comportamiento

Correr los test y revisar cuáles no pasan
 - Se debe a cambios de nombres de los data-cy y la semántica de los componentes
 - Corregirlos para que pasen

Configurar DOTENV en el BACKEND y CYPRESS

*/
