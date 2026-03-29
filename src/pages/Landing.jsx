import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPlanets } from '../store/slices/planetsSlice';
import { fetchPlanetById } from '../store/slices/planetDetailSlice';
import CharacterCard from '../components/CharacterCard';
import Loading from '../components/Loading';

function Landing() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allPlanets: planets, loadingAll } = useSelector((state) => state.planets);
  const { data: planetDetail } = useSelector((state) => state.planetDetail);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [loadingPlanet, setLoadingPlanet] = useState(false);
  const [showCharacters, setShowCharacters] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (planets.length === 0) {
      dispatch(fetchAllPlanets());
    }
  }, [dispatch, planets.length]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = [];
    const starCount = 200;

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.5 + 0.3
      });
    }

    let animationId;

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 26, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach(star => {
        star.x -= star.speed;
        if (star.x < 0) {
          star.x = canvas.width;
          star.y = Math.random() * canvas.height;
        }
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handlePlanetClick = async (e, planet) => {
    e.stopPropagation();
    setLoadingPlanet(true);
    setSelectedPlanet(planet);
    setShowCharacters(false);
    
    await dispatch(fetchPlanetById(planet.id));
    
    setLoadingPlanet(false);
    setShowCharacters(true);
  };

  const handleClose = (e) => {
    if (e) e.stopPropagation();
    setSelectedPlanet(null);
    setShowCharacters(false);
  };
  
  const universePlanets = planets.filter(p => 
    p.name.includes('Universo')
  );
  
  const leftPlanets = planets.filter(p => 
    p.name.includes('Templo') ||
    p.name.includes('Bills') ||
    p.name.includes('Nucleo') ||
    p.name.includes('Gran Kaio') ||
    p.name.includes('sagrado') ||
    p.name.includes('Otro Mundo')
  );
  
  const orbitingPlanets = planets.filter(p => 
    !p.name.includes('Universo') && 
    !p.name.includes('Templo') &&
    !p.name.includes('Bills') &&
    !p.name.includes('Nucleo') &&
    !p.name.includes('Gran Kaio') &&
    !p.name.includes('sagrado') &&
    !p.name.includes('Otro Mundo')
  );

  return (
    <div className="landing-container">
      <canvas ref={canvasRef} className="stars-canvas" />
      
      <div className="landing-header">
        <h1 className="landing-title">Dragon Ball Universe</h1>
        <p className="landing-subtitle">Explora el cosmos de Dragon Ball</p>
      </div>

      <div className="right-planets-container">
        <h3 style={{ color: 'white', marginBottom: '10px' }}>Universos ({universePlanets.length})</h3>
        {universePlanets.map((planet) => (
          <div 
            key={planet.id}
            className="special-planet"
            onClick={(e) => handlePlanetClick(e, planet)}
          >
            <div className="special-planet-image">
              <img src={planet.image} alt={planet.name} />
            </div>
            <span className="special-planet-label">{planet.name}</span>
          </div>
        ))}
      </div>

      <div className="left-planets-container">
        <h3 style={{ color: 'white', marginBottom: '10px' }}>Especiales ({leftPlanets.length})</h3>
        {leftPlanets.map((planet) => (
          <div 
            key={planet.id}
            className="center-planet"
            onClick={(e) => handlePlanetClick(e, planet)}
          >
            <div className="center-planet-image">
              <img src={planet.image} alt={planet.name} />
            </div>
            <span className="center-planet-label">{planet.name}</span>
          </div>
        ))}
      </div>

      <div className="orbit-container">
        <div className="sun">
          <div className="sun-glow"></div>
          <svg viewBox="0 0 100 100" className="sun-icon">
            <defs>
              <radialGradient id="sunGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffff00" />
                <stop offset="50%" stopColor="#ff9900" />
                <stop offset="100%" stopColor="#ff3300" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="40" fill="url(#sunGradient)" />
          </svg>
        </div>

        <div className="orbit-line orbit-1"></div>
        <div className="orbit-line orbit-2"></div>
        <div className="orbit-line orbit-3"></div>
        <div className="orbit-line orbit-4"></div>
        <div className="orbit-line orbit-5"></div>

        <div className="planets-orbit">
          {orbitingPlanets.map((planet, index) => (
            <div 
              key={planet.id}
              className="planet-orbit-wrapper"
              style={{ 
                animation: `orbit-${(index % 5) + 1} ${15 + index * 2}s linear infinite`,
                animationDelay: `${-index * 2}s`
              }}
              onClick={(e) => handlePlanetClick(e, planet)}
            >
              <div className="planet">
                <img src={planet.image} alt={planet.name} />
                <div className="planet-glow"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="landing-instructions">
        <p>Haz clic en un planeta para ver sus habitantes</p>
      </div>

      {loadingAll && (
        <div className="has-text-centered" style={{ position: 'relative', zIndex: 10 }}>
          <Loading />
          <p className="has-text-white mt-4">Cargando planetas...</p>
        </div>
      )}

      {selectedPlanet && (
        <div className={`planet-modal ${showCharacters ? 'active' : ''}`}>
          <div className="modal-backdrop" onClick={handleClose}></div>
          <div className="modal-content-landing">
            <button className="modal-close-btn" onClick={handleClose}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </button>
            
            <div className="planet-header-modal">
              <img src={selectedPlanet.image} alt={selectedPlanet.name} className="planet-modal-image" />
              <div className="planet-modal-info">
                <h2 className="title is-3">{selectedPlanet.name}</h2>
                <p>{selectedPlanet.description || 'Sin descripción disponible'}</p>
                <span className={`tag ${selectedPlanet.isDestroyed ? 'is-danger' : 'is-success'} is-medium mt-3`}>
                  {selectedPlanet.isDestroyed ? 'Destruido' : 'Activo'}
                </span>
              </div>
            </div>

            <div className="planet-characters-section">
              <h3 className="title is-4">Habitantes de {selectedPlanet.name}</h3>
              
              {loadingPlanet ? (
                <Loading />
              ) : showCharacters && planetDetail?.characters?.length > 0 ? (
                <div className="columns is-multiline">
                  {planetDetail.characters.map((char) => (
                    <CharacterCard key={char.id} character={char} />
                  ))}
                </div>
              ) : showCharacters ? (
                <p className="has-text-centered has-text-white">No hay personajes registrados en este planeta</p>
              ) : null}
            </div>

            <div className="planet-modal-actions">
              <button className="button is-danger" onClick={() => navigate(`/planets/${selectedPlanet.id}`)}>
                Ver más detalles
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Landing;
