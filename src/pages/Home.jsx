import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

function Home() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = 400;

    const particles = [];
    const particleCount = 100;

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 10;
        this.size = Math.random() * 3 + 1;
        this.speedY = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 2;
        this.life = 1;
        this.decay = Math.random() * 0.015 + 0.005;
        const colors = ['#ff6600', '#ffcc00', '#ff3300', '#ffff00', '#ff9900'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.life -= this.decay;
        if (this.life <= 0) this.reset();
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.life;
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let animationId;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(26, 26, 46, 0.3)');
      gradient.addColorStop(1, 'rgba(26, 26, 46, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <section className="hero is-primary is-medium hero-container">
        <canvas ref={canvasRef} className="energy-canvas" />
        <div className="dragon-ball-container">
          <div className="dragon-ball">
            <div className="dragon-ball-shine"></div>
            <div className="star star-1">★</div>
            <div className="star star-2">★</div>
            <div className="star star-3">★</div>
            <div className="star star-4">★</div>
          </div>
          <div className="dragon-ball-glow"></div>
        </div>
        <div className="hero-body">
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column">
              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front box has-text-centered">
                    <span className="icon is-large has-text-danger">
                      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                      </svg>
                    </span>
                    <h2 className="title is-4 mt-4">Personajes</h2>
                    <p>Explora todos los personajes del universo Dragon Ball</p>
                    <Link to="/characters" className="button is-danger mt-4">Ver Personajes</Link>
                  </div>
                  <div className="flip-card-back box has-text-centered">
                    <h2 className="title is-4" style={{ color: '#e60000' }}>Personajes</h2>
                    <div className="flip-content">
                      <p>Descubre a todos los guerreros del universo: Saiyans, Namekianos, androides y más.</p>
                      <br />
                      <p>Cada personaje tiene habilidades únicas y transformaciones especiales.</p>
                      <br />
                      <p>Ordena por raza, busca por nombre y explora sus estadísticas de poder.</p>
                    </div>
                    <Link to="/characters" className="button is-danger mt-4">Explorar</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front box has-text-centered">
                    <span className="icon is-large has-text-info">
                      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16Zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                      </svg>
                    </span>
                    <h2 className="title is-4 mt-4">Planetas</h2>
                    <p>Descubre los planetas del universo Dragon Ball</p>
                    <Link to="/planets" className="button is-info mt-4">Ver Planetas</Link>
                  </div>
                  <div className="flip-card-back box has-text-centered">
                    <h2 className="title is-4" style={{ color: '#0066cc' }}>Planetas</h2>
                    <div className="flip-content">
                      <p>Viaja por el universo 7 explorando planetas desde Namek hasta la Tierra.</p>
                      <br />
                      <p>Conoce los mundos natales de tus personajes favoritos y sus historias.</p>
                      <br />
                      <p>Algunos planetas fueron destruidos en épicas batallas. ¡Descúbrelos!</p>
                    </div>
                    <Link to="/planets" className="button is-info mt-4">Explorar</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front box has-text-centered">
                    <span className="icon is-large has-text-warning">
                      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5z"/>
                        <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1h-3zm1.038 3.018a6.093 6.093 0 0 1 .924 0 6 6 0 1 1-.924 0zM0 3.5c0 .753.333 1.429.86 1.887A8.035 8.035 0 0 0 4.387 1.86 2.5 2.5 0 0 1 0 3.5zm13.5.5c-.115-.458-1.037-.736-1.887-.86A8.035 8.035 0 0 0 9.613 1.86 2.5 2.5 0 0 1 13.5.5z"/>
                      </svg>
                    </span>
                    <h2 className="title is-4 mt-4">Transformaciones</h2>
                    <p>Conoce todas las transformaciones de los personajes</p>
                    <Link to="/transformations" className="button is-warning mt-4">Ver Transformaciones</Link>
                  </div>
                  <div className="flip-card-back box has-text-centered">
                    <h2 className="title is-4" style={{ color: '#cc6600' }}>Transformaciones</h2>
                    <div className="flip-content">
                      <p>Desde el Super Saiyan hasta el Ultra Instinto: domina el poder de cada transformación.</p>
                      <br />
                      <p>Compara niveles de Ki entre transformaciones y elige tu favorita.</p>
                      <br />
                      <p>Cada personaje tiene un camino único de evolución. ¡Descúbrelos!</p>
                    </div>
                    <Link to="/transformations" className="button is-warning mt-4">Explorar</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
