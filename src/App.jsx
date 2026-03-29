import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Characters from './pages/Characters';
import CharacterDetail from './pages/CharacterDetail';
import Planets from './pages/Planets';
import PlanetDetail from './pages/PlanetDetail';
import Transformations from './pages/Transformations';
import Landing from './pages/Landing';

function Home() {
  return (
    <div className="section" style={{ minHeight: 'calc(100vh - 150px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container has-text-centered">
        <h1 className="title is-1" style={{ color: '#ff6600', textShadow: '0 0 30px rgba(255,100,0,0.5)' }}>Dragon Ball API</h1>
        <p className="subtitle is-3" style={{ color: 'rgba(255,255,255,0.8)' }}>Explora el universo</p>
        <div className="columns mt-6">
          <div className="column">
            <Link to="/planets" className="button is-large is-danger is-rounded" style={{ padding: '2rem 3rem' }}>
              Explorar Planetas
            </Link>
          </div>
          <div className="column">
            <Link to="/characters" className="button is-large is-info is-rounded" style={{ padding: '2rem 3rem' }}>
              Ver Personajes
            </Link>
          </div>
          <div className="column">
            <Link to="/transformations" className="button is-large is-warning is-rounded" style={{ padding: '2rem 3rem' }}>
              Transformaciones
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
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
            <Link className="navbar-item" to="/">Inicio</Link>
            <Link className="navbar-item" to="/characters">Personajes</Link>
            <Link className="navbar-item" to="/planets">Planetas</Link>
            <Link className="navbar-item" to="/transformations">Transformaciones</Link>
          </div>
        </div>
      </nav>
      <div style={{ paddingTop: '52px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/characters/:id" element={<CharacterDetail />} />
          <Route path="/planets" element={<Landing />} />
          <Route path="/planets/:id" element={<PlanetDetail />} />
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
