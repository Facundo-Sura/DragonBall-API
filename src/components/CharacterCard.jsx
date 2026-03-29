import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function CharacterCard({ character }) {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/characters/${character.id}`);
  };

  return (
    <div className="column is-4-desktop is-6-tablet">
      <div className="character-card-3d" onClick={handleClick}>
        <div className="character-card-inner">
          <div className="character-card-front">
            <div className="character-image-container">
              <img 
                src={character.image} 
                alt={character.name} 
                loading="lazy"
                className="character-image"
              />
              <div className="character-glow"></div>
            </div>
            <div className="card-content">
              <p className="title is-4 has-text-danger has-text-centered">{character.name}</p>
              <div className="content has-text-centered">
                <span className="tag is-info is-light mr-2">{character.race}</span>
                <span className="tag is-success is-light">{character.gender}</span>
                <p className="mt-2" style={{ color: '#363636' }}>
                  <strong style={{ color: '#e60000' }}>Ki:</strong> {character.ki || 'Desconocido'}
                </p>
              </div>
              <div className="has-text-centered click-hint">
                <span className="tag is-danger is-light">
                  Click para ver detalles
                </span>
              </div>
            </div>
          </div>
          <div className="character-card-shadow"></div>
        </div>
      </div>
    </div>
  );
}

export default CharacterCard;
