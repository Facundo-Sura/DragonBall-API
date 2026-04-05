import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Characters from './pages/Characters';
import CharacterDetail from './pages/CharacterDetail';
import Planets from './pages/Planets';
import PlanetDetail from './pages/PlanetDetail';
import Transformations from './pages/Transformations';
import Landing from './pages/Landing';

function Navbar() {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  if (isLanding) return null;

  return (
    <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/planets">
          <img src="https://upload.wikimedia.org/wikipedia/commons/3/37/Dragon_Ball_Z_Logo.svg" alt="Dragon Ball API" style={{ maxHeight: '50px', filter: 'brightness(0) invert(1)' }} />
        </Link>
        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <Link className="navbar-item" to="/planets">Inicio</Link>
          <Link className="navbar-item" to="/characters">Personajes</Link>
          <Link className="navbar-item" to="/planets">Planetas</Link>
          <Link className="navbar-item" to="/transformations">Transformaciones</Link>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ paddingTop: '52px' }}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/planets" element={<Planets />} />
          <Route path="/planets/:id" element={<PlanetDetail />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/characters/:id" element={<CharacterDetail />} />
          <Route path="/transformations" element={<Transformations />} />
        </Routes>
      </div>
      <footer className="footer" style={{ background: 'rgba(0,0,0,0.3)', color: 'white', textAlign: 'center', padding: '2rem' }}>
        <div className="content has-text-centered">
          <p style={{ color: 'rgba(255,255,255,0.8)' }}>
            <strong style={{ color: '#ff0000' }}>Dragon Ball API</strong> - Datos proporcionados por dragonball-api.com
          </p>
        </div>
      </footer>
    </Router>
  );
}

export default App;