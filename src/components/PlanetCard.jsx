import { useNavigate } from 'react-router-dom';

function PlanetCard({ planet }) {
  const navigate = useNavigate();
  
  const truncateText = (text, maxLength = 100) => {
    if (!text) return 'Sin descripcion';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const handleClick = () => {
    navigate(`/planets/${planet.id}`);
  };

  return (
    <div className="column is-4-desktop is-6-tablet">
      <div className="card planet-card" onClick={handleClick}>
        <div className="card-image planet-image">
          <img 
            src={planet.image} 
            alt={planet.name} 
            loading="lazy"
            style={{ width: '100%', height: '150px', objectFit: 'contain' }}
          />
        </div>
        <div className="card-content planet-card-content">
          <p className="title is-5 has-text-danger planet-name">{planet.name}</p>
          <div className="content">
            <p className="planet-description">{truncateText(planet.description, 100)}</p>
            <span className="tag is-warning is-light">{planet.isDestroyed ? 'Destruido' : 'Activo'}</span>
          </div>
        </div>
        <div className="planet-card-footer">
          <button className="button is-small is-danger" onClick={(e) => e.stopPropagation()}>
            Ver Detalles
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlanetCard;
