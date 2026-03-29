import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacterById, clearCharacterDetail } from '../store/slices/characterDetailSlice';
import Loading from '../components/Loading';
import Error from '../components/Error';
import ImageModal from '../components/ImageModal';

function CharacterDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.characterDetail);
  const [selectedTransformation, setSelectedTransformation] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  useEffect(() => {
    dispatch(fetchCharacterById(id));
    return () => {
      dispatch(clearCharacterDetail());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (data?.transformations?.length > 0 && !selectedTransformation) {
      setSelectedTransformation(data.transformations[0]);
    }
  }, [data, selectedTransformation]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!data) return null;

  const openModal = (image, title) => {
    setModalImage(image);
    setModalTitle(title);
    setModalOpen(true);
  };

  const handleTransformationClick = (trans) => {
    setSelectedTransformation(trans);
  };

  return (
    <div className="section">
      <div className="container">
        <Link to="/characters" className="button is-small is-danger mb-4">
          <span className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
            </svg>
          </span>
          <span>Volver</span>
        </Link>

        <div className="columns">
          <div className="column is-5">
            <div className="card">
              <div 
                className="clickable-image"
                onClick={() => openModal(data.image, data.name)}
                style={{ 
                  height: '400px', 
                  background: 'linear-gradient(180deg, #1a1a2e 0%, #0f3460 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1rem',
                  cursor: 'zoom-in'
                }}
              >
                <img 
                  src={data.image} 
                  alt={data.name}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'contain' 
                  }} 
                />
              </div>
              <div className="card-content" style={{ background: 'rgba(255, 255, 255, 0.95)' }}>
                <h2 className="title is-4 has-text-centered" style={{ color: '#e60000' }}>{data.name}</h2>
                <div className="has-text-centered">
                  <span className="tag is-info is-light mr-2">{data.race}</span>
                  <span className="tag is-success is-light">{data.gender}</span>
                </div>
                <p className="has-text-centered mt-2 is-size-7" style={{ color: '#666' }}>
                  Clic en la imagen para ampliar
                </p>
              </div>
            </div>
          </div>

          <div className="column">
            <div className="box" style={{ background: 'rgba(255, 255, 255, 0.95)' }}>
              <h1 className="title is-2" style={{ color: '#e60000' }}>{data.name}</h1>
              
              <div className="tags mb-4">
                <span className="tag is-info is-medium">{data.race}</span>
                <span className="tag is-success is-medium">{data.gender}</span>
              </div>

              <div style={{ color: '#363636', background: 'white', padding: '1rem', borderRadius: '8px' }}>
                <p className='mb-2' style={{ color: '#363636' }}>
                  <strong style={{ color: '#000fe6' }}>Ki:</strong> {data.ki || 'Desconocido'}
                </p>
                <p className='mb-2' style={{ color: '#363636' }}>
                  <strong style={{ color: '#000fe6' }}>Ki Maximo:</strong> {data.maxKi || 'Desconocido'}
                </p>
                <p className='mb-2' style={{ color: '#363636' }}>
                  <strong style={{ color: '#000fe6' }}>Afiliacion:</strong> {data.affiliation || 'Desconocida'}
                </p>

                {data.originPlanet && (
                  <p className='mb-2' style={{ color: '#363636' }}>
                    <strong style={{ color: '#000fe6' }}>Planeta de Origen:</strong>{' '}
                    <Link to={`/planets/${data.originPlanet.id}`} style={{ color: '#e60000' }}>
                      {data.originPlanet.name}
                    </Link>
                  </p>
                )}
              </div>
            </div>

            {data.transformations && data.transformations.length > 0 && (
              <div className="box mt-4" style={{ background: 'rgba(255, 255, 255, 0.95)' }}>
                <h3 className="title is-4" style={{ color: '#000000' }}>Transformaciones</h3>
                
                <div className="transformation-tabs">
                  {data.transformations.map((trans) => (
                    <button
                      key={trans.id}
                      className={`transformation-tab ${selectedTransformation?.id === trans.id ? 'active' : ''}`}
                      onClick={() => handleTransformationClick(trans)}
                    >
                      {trans.name}
                    </button>
                  ))}
                </div>

                {selectedTransformation && (
                  <div 
                    className="transformation-preview clickable-image"
                    onClick={() => openModal(selectedTransformation.image, selectedTransformation.name)}
                  >
                    <div className="transformation-preview-image">
                      <img src={selectedTransformation.image} alt={selectedTransformation.name} />
                    </div>
                    <div className="transformation-preview-info">
                      <h4 className="title is-4" style={{ color: '#e60000' }}>{selectedTransformation.name}</h4>
                      <p className="subtitle is-6" style={{ color: '#666' }}>Ki: {selectedTransformation.ki || 'Desconocido'}</p>
                    </div>
                  </div>
                )}

                <div className="columns is-multiline mt-4">
                  {data.transformations.map((trans) => (
                    <div key={trans.id} className="column is-4">
                      <div 
                        className={`card ${selectedTransformation?.id === trans.id ? 'transformation-selected' : ''}`}
                        onClick={() => handleTransformationClick(trans)}
                        style={{ cursor: 'pointer' }}
                      >
                        <div 
                          className="card-image transformation-image"
                          onClick={(e) => {
                            e.stopPropagation();
                            openModal(trans.image, trans.name);
                          }}
                        >
                          <img 
                            src={trans.image} 
                            alt={trans.name} 
                            loading="lazy"
                            style={{ 
                              width: '100%', 
                              height: '180px', 
                              objectFit: 'contain' 
                            }}
                          />
                        </div>
                        <div className="card-content" style={{ background: 'rgba(255, 255, 255, 0.95)', padding: '0.75rem' }}>
                          <p className="has-text-centered" style={{ color: '#e60000', fontWeight: 'bold' }}>{trans.name}</p>
                          <p className="has-text-centered is-size-7" style={{ color: '#000' }}>Ki: {trans.ki || 'Desconocido'}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <ImageModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        image={modalImage} 
        title={modalTitle} 
      />
    </div>
  );
}

export default CharacterDetail;
