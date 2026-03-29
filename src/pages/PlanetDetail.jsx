import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlanetById, clearPlanetDetail } from '../store/slices/planetDetailSlice';
import Loading from '../components/Loading';
import Error from '../components/Error';

function PlanetDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.planetDetail);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    dispatch(fetchPlanetById(id));
    return () => {
      dispatch(clearPlanetDetail());
    };
  }, [dispatch, id]);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrollTop = window.scrollY;
        const elementTop = scrollTop + rect.top;
        const scrollHeight = window.innerHeight;
        
        const startScroll = elementTop - scrollHeight;
        const endScroll = elementTop + rect.height * 0.3;
        const totalScroll = endScroll - startScroll;
        
        let progress = (scrollTop - startScroll) / totalScroll;
        progress = Math.max(0, Math.min(1, progress));
        
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!data) return null;

  const splitAngle = scrollProgress * 180;
  const isOpen = scrollProgress > 0.5;
  const charactersReveal = Math.max(0, (scrollProgress - 0.5) * 2);

  return (
    <div className="planet-detail-container" ref={containerRef}>
      <div className="scroll-hint" style={{ opacity: 1 - scrollProgress * 2 }}>
        <p>Haz scroll para explorar</p>
        <div className="scroll-arrow">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"/>
          </svg>
        </div>
      </div>

      <div className="planet-split-container">
        <div 
          className="planet-hemisphere planet-hemisphere-top"
          style={{
            transform: `perspective(1000px) rotateX(${splitAngle * 0.5}deg) translateY(${-scrollProgress * 50}px)`,
            clipPath: scrollProgress > 0.1 ? `polygon(0 0, 100% 0, 100% ${100 - splitAngle * 0.3}%, 0 ${100 - splitAngle * 0.3}%)` : 'none'
          }}
        >
          <div className="hemisphere-content">
            <img 
              src={data.image} 
              alt={data.name}
              className="planet-image-top"
            />
          </div>
          <div className="planet-info-top" style={{ opacity: 1 - scrollProgress * 2 }}>
            <h1 className="title is-1">{data.name}</h1>
            <span className={`tag is-medium ${data.isDestroyed ? 'is-danger' : 'is-success'}`}>
              {data.isDestroyed ? 'Destruido' : 'Activo'}
            </span>
          </div>
        </div>

        <div 
          className="planet-hemisphere planet-hemisphere-bottom"
          style={{
            transform: `perspective(1000px) rotateX(${-splitAngle * 0.5}deg) translateY(${scrollProgress * 50}px)`,
            clipPath: scrollProgress > 0.1 ? `polygon(0 ${splitAngle * 0.3}%, 100% ${splitAngle * 0.3}%, 100% 100%, 0 100%)` : 'none'
          }}
        >
          <div className="hemisphere-content">
            <img 
              src={data.image} 
              alt={data.name}
              className="planet-image-bottom"
            />
          </div>
        </div>

        <div className="planet-center-line" style={{ opacity: scrollProgress < 0.8 ? 0.8 - scrollProgress : 0 }}>
          <div className="energy-glow"></div>
        </div>
      </div>

      <div 
        className="characters-reveal"
        style={{ 
          opacity: charactersReveal,
          transform: `translateY(${(1 - charactersReveal) * 100}px)`,
          pointerEvents: charactersReveal > 0.5 ? 'auto' : 'none'
        }}
      >
        <div className="characters-container">
          <h2 className="title is-2 has-text-centered" style={{ color: '#ff6600' }}>
            Habitantes de {data.name}
          </h2>
          
          {data.characters && data.characters.length > 0 ? (
            <div className="columns is-multiline">
              {data.characters.map((char, index) => (
                <div 
                  key={char.id} 
                  className="column is-4-desktop is-6-tablet"
                  style={{ 
                    opacity: charactersReveal,
                    transform: `translateY(${(1 - charactersReveal) * 50}px)`,
                    transitionDelay: `${index * 0.1}s`
                  }}
                >
                  <Link to={`/characters/${char.id}`} className="character-mini-card">
                    <div className="character-mini-image">
                      <img src={char.image} alt={char.name} loading="lazy" />
                    </div>
                    <p className="character-mini-name">{char.name}</p>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="has-text-centered has-text-white">No hay personajes registrados</p>
          )}

          <div className="has-text-centered mt-6">
            <Link to="/planets" className="button is-danger is-large">
              Volver a los Planetas
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlanetDetail;
