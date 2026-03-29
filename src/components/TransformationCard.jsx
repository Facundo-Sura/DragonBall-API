import { useState } from 'react';

function TransformationCard({ transformation }) {
  const [isHovered, setIsHovered] = useState(false);
  const characterName = transformation.name.split(' ')[0];
  
  return (
    <div className="column is-4-desktop is-6-tablet">
      <div 
        className={`transformation-card ${isHovered ? 'hovered' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="transformation-image-container">
          <img 
            src={transformation.image} 
            alt={transformation.name} 
            loading="lazy"
            className="transformation-image"
          />
          <div className="transformation-glow"></div>
        </div>
        <div className="transformation-info">
          <p className="transformation-name">{transformation.name}</p>
          <div className="transformation-details">
            <p><strong>Personaje:</strong> {characterName}</p>
            <p><strong>Ki:</strong> {transformation.ki || 'Desconocido'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransformationCard;
