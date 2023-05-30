import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { TeamsTable } from './components/TeamsTable';

function App() {
  return (
    <main>
      <Router>
        <Navbar />
        <header className="pt-24 text-center">
          <h1 className="text-gray-800 text-5xl font-bold">CRUD-Clubes</h1>
        </header>
        <Routes>
          <Route path="/" element={<TeamsTable />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
