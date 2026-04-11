import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate();
  
  const handleSphereClick = (starCount) => {
    switch (starCount) {
      case 1:
        navigate('/characters');
        break;
      case 2:
        navigate('/planets');
        break;
      case 3:
        navigate('/transformations');
        break;
      case 4:
        window.open('https://jkanime.net/dragon-ball/', '_blank');
        break;
      case 5:
        window.open('https://jkanime.net/dragon-ball-z/', '_blank');
        break;
      case 6:
        window.open('https://jkanime.net/dragon-ball-gt/', '_blank');
        break;
      case 7:
        window.open('https://jkanime.net/dragon-ball-super/', '_blank');
        break;
      default:
        break;
    }
  };

  const renderStars = (count) => {
    const stars = [];
    const positions = [
      { x: 0, y: -20 },
      { x: 18, y: -8 },
      { x: 12, y: 15 },
      { x: -12, y: 15 },
      { x: -18, y: -8 },
      { x: 0, y: 0 },
      { x: 0, y: 10 }
    ];
    
    for (let i = 0; i < count; i++) {
      const pos = positions[i] || { x: 0, y: 0 };
      stars.push(
        <span 
          key={i} 
          className="star-icon"
          style={{
            position: 'absolute',
            left: `calc(50% + ${pos.x}px)`,
            top: `calc(50% + ${pos.y}px)`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="landing-container">
      {/* Nubes en el cielo (mitad superior) */}
      <div className="clouds">
        <div className="cloud cloud-1"></div>
        <div className="cloud cloud-2"></div>
        <div className="cloud cloud-3"></div>
      </div>
      
      {/* Mar con olas (mitad inferior) */}
      <div className="sea-waves-2"></div>
      <div className="sea-waves"></div>
      
      <h1 className="landing-new-title">Dragon Ball Universe</h1>
      <p className="landing-new-subtitle">Colecciona las 7 bolas del dragón</p>

      <div className="dragon-balls-container">
        {/* Bola central - 1 estrella */}
        <div 
          className="dragon-ball-wrapper" 
          onClick={() => handleSphereClick(1)}
        >
          <div className="dragon-ball dragon-ball-1">
            <div className="dragon-ball-shine"></div>
            <div className="dragon-ball-glow"></div>
            <div className="stars-container">
              {renderStars(1)}
            </div>
          </div>
        </div>

        {/* Orbiting balls - cada uno en su propia órbita */}
        {/* Ball 2 - 2 estrellas */}
        <div className="orbit-wrapper dragon-ball-2-wrapper">
          <div className="dragon-ball-wrapper" onClick={() => handleSphereClick(2)}>
            <div className="dragon-ball dragon-ball-2">
              <div className="dragon-ball-shine"></div>
              <div className="dragon-ball-glow"></div>
              <div className="stars-container">
                {renderStars(2)}
              </div>
            </div>
          </div>
        </div>

        {/* Ball 3 - 3 estrellas */}
        <div className="orbit-wrapper dragon-ball-3-wrapper">
          <div className="dragon-ball-wrapper" onClick={() => handleSphereClick(3)}>
            <div className="dragon-ball dragon-ball-3">
              <div className="dragon-ball-shine"></div>
              <div className="dragon-ball-glow"></div>
              <div className="stars-container">
                {renderStars(3)}
              </div>
            </div>
          </div>
        </div>

        {/* Ball 4 - 4 estrellas */}
        <div className="orbit-wrapper dragon-ball-4-wrapper">
          <div className="dragon-ball-wrapper" onClick={() => handleSphereClick(4)}>
            <div className="dragon-ball dragon-ball-4">
              <div className="dragon-ball-shine"></div>
              <div className="dragon-ball-glow"></div>
              <div className="stars-container">
                {renderStars(4)}
              </div>
            </div>
          </div>
        </div>

        {/* Ball 5 - 5 estrellas */}
        <div className="orbit-wrapper dragon-ball-5-wrapper">
          <div className="dragon-ball-wrapper" onClick={() => handleSphereClick(5)}>
            <div className="dragon-ball dragon-ball-5">
              <div className="dragon-ball-shine"></div>
              <div className="dragon-ball-glow"></div>
              <div className="stars-container">
                {renderStars(5)}
              </div>
            </div>
          </div>
        </div>

        {/* Ball 6 - 6 estrellas */}
        <div className="orbit-wrapper dragon-ball-6-wrapper">
          <div className="dragon-ball-wrapper" onClick={() => handleSphereClick(6)}>
            <div className="dragon-ball dragon-ball-6">
              <div className="dragon-ball-shine"></div>
              <div className="dragon-ball-glow"></div>
              <div className="stars-container">
                {renderStars(6)}
              </div>
            </div>
          </div>
        </div>

        {/* Ball 7 - 7 estrellas */}
        <div className="orbit-wrapper dragon-ball-7-wrapper">
          <div className="dragon-ball-wrapper" onClick={() => handleSphereClick(7)}>
            <div className="dragon-ball dragon-ball-7">
              <div className="dragon-ball-shine"></div>
              <div className="dragon-ball-glow"></div>
              <div className="stars-container">
                {renderStars(7)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="landing-new-instructions">Haz clic en las esferas para entrar al universo</p>
      <p className="click-hint">↓ Click para comenzar ↓</p>
    </div>
  );
}

export default Landing;