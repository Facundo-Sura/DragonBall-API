import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlanets, fetchAllPlanets, setPage, clearAllPlanets } from '../store/slices/planetsSlice';
import PlanetCard from '../components/PlanetCard';
import Loading from '../components/Loading';
import Error from '../components/Error';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';

function Planets() {
  const dispatch = useDispatch();
  const { items, allPlanets, loading, loadingAll, error, page, totalPages } = useSelector((state) => state.planets);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [searchTriggered, setSearchTriggered] = useState(false);

  useEffect(() => {
    dispatch(fetchPlanets(page));
    
    return () => {
      dispatch(setPage(1));
      dispatch(clearAllPlanets());
    };
  }, []);

  useEffect(() => {
    if (page > 1 && !searchTriggered) {
      dispatch(fetchPlanets(page));
    }
  }, [page, searchTriggered, dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearch !== '') {
      setSearchTriggered(true);
      if (allPlanets.length === 0) {
        dispatch(fetchAllPlanets());
      }
    } else {
      setSearchTriggered(false);
    }
  }, [debouncedSearch, dispatch, allPlanets.length]);

  const handlePageChange = (newPage) => {
    if (!searchTriggered) {
      dispatch(setPage(newPage));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setDebouncedSearch('');
    setSearchTriggered(false);
    dispatch(clearAllPlanets());
  };

  const filteredPlanets = useMemo(() => {
    const sourceData = searchTriggered ? allPlanets : items;
    
    if (!searchTriggered || sourceData.length === 0) {
      return items.filter((planet) =>
        planet.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    return sourceData.filter((planet) =>
      planet.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [items, allPlanets, debouncedSearch, searchTriggered]);

  if (loading && !searchTriggered) return <Loading />;
  if (error && !searchTriggered) return <Error message={error} />;

  const showNoResults = !loadingAll && filteredPlanets.length === 0 && searchTriggered;

  return (
    <div className="section">
      <div className="container">
        <h1 className="title has-text-white">Planetas</h1>
        
        <div className="search-section">
          <SearchBar 
            searchTerm={searchTerm} 
            onSearchChange={setSearchTerm} 
            placeholder="Buscar planeta..." 
          />
        </div>

        {loadingAll ? (
          <div className="has-text-centered">
            <Loading />
            <p className="has-text-white mt-4">Buscando en todos los planetas...</p>
          </div>
        ) : showNoResults ? (
          <div className="has-text-centered">
            <p className="has-text-white title is-4">No se encontraron planetas</p>
            <p className="has-text-white is-size-5 mt-2">
              No hay resultados para "{debouncedSearch}"
            </p>
            <button 
              className="button is-danger mt-4"
              onClick={handleClearFilters}
            >
              Limpiar busqueda
            </button>
          </div>
        ) : (
          <>
            <div className="columns is-multiline">
              {filteredPlanets.map((planet) => (
                <PlanetCard key={planet.id} planet={planet} />
              ))}
            </div>
            {!searchTriggered && (
              <Pagination 
                currentPage={page} 
                totalPages={totalPages} 
                onPageChange={handlePageChange} 
              />
            )}
            {searchTriggered && filteredPlanets.length > 0 && (
              <div className="has-text-centered mt-4">
                <p className="has-text-white is-size-5">
                  Mostrando {filteredPlanets.length} resultado(s) de {allPlanets.length}
                </p>
                <button 
                  className="button is-small is-danger mt-2"
                  onClick={handleClearFilters}
                >
                  Ver todos los planetas
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Planets;
