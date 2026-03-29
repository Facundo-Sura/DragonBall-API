import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters, fetchAllCharacters, setPage, clearAllCharacters } from '../store/slices/charactersSlice';
import CharacterCard from '../components/CharacterCard';
import Loading from '../components/Loading';
import Error from '../components/Error';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import Pagination from '../components/Pagination';

const RACES = ['Saiyan', 'Human', 'Namekian', 'Majin', 'Frieza Race', 'Android', 'Jiren Race', 'God', 'Angel', 'Evil', 'Nucleico', 'Unknown'];

function Characters() {
  const dispatch = useDispatch();
  const { items, allCharacters, loading, loadingAll, error, page, totalPages } = useSelector((state) => state.characters);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedRace, setSelectedRace] = useState('');
  const [searchTriggered, setSearchTriggered] = useState(false);

  useEffect(() => {
    dispatch(fetchCharacters(page));
  }, [dispatch, page]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearch !== '' || selectedRace !== '') {
      setSearchTriggered(true);
      if (allCharacters.length === 0) {
        dispatch(fetchAllCharacters());
      }
    } else {
      setSearchTriggered(false);
    }
  }, [debouncedSearch, selectedRace, dispatch, allCharacters.length]);

  const handlePageChange = (newPage) => {
    if (!searchTriggered) {
      dispatch(setPage(newPage));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleRaceChange = (race) => {
    setSelectedRace(race);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedRace('');
    setSearchTriggered(false);
    dispatch(clearAllCharacters());
  };

  const filteredCharacters = useMemo(() => {
    const sourceData = searchTriggered ? allCharacters : items;
    
    if (!searchTriggered || sourceData.length === 0) {
      return items.filter((char) => {
        const matchesSearch = !debouncedSearch || 
          char.name.toLowerCase().includes(debouncedSearch.toLowerCase());
        const matchesRace = !selectedRace || char.race === selectedRace;
        return matchesSearch && matchesRace;
      });
    }

    return sourceData.filter((char) => {
      const matchesSearch = !debouncedSearch || 
        char.name.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchesRace = !selectedRace || char.race === selectedRace;
      return matchesSearch && matchesRace;
    });
  }, [items, allCharacters, debouncedSearch, selectedRace, searchTriggered]);

  if (loading && !searchTriggered) return <Loading />;
  if (error && !searchTriggered) return <Error message={error} />;

  const showNoResults = !loadingAll && filteredCharacters.length === 0 && searchTriggered;

  return (
    <div className="section">
      <div className="container">
        <h1 className="title has-text-white">Personajes</h1>
        
        <div className="search-section">
          <div className="columns">
            <div className="column is-8">
              <SearchBar 
                searchTerm={searchTerm} 
                onSearchChange={setSearchTerm} 
                placeholder="Buscar personaje..." 
              />
            </div>
            <div className="column is-4">
              <FilterBar 
                races={RACES} 
                selectedRace={selectedRace} 
                onRaceChange={handleRaceChange} 
              />
            </div>
          </div>
        </div>

        {loadingAll ? (
          <div className="has-text-centered">
            <Loading />
            <p className="has-text-white mt-4">Buscando en todos los personajes...</p>
          </div>
        ) : showNoResults ? (
          <div className="has-text-centered">
            <p className="has-text-white title is-4">No se encontraron personajes</p>
            <p className="has-text-white is-size-5 mt-2">
              {debouncedSearch && `No hay resultados para "${debouncedSearch}"`}
              {selectedRace && `No hay personajes de la raza ${selectedRace}`}
            </p>
            <button 
              className="button is-danger mt-4"
              onClick={handleClearFilters}
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          <>
            <div className="columns is-multiline">
              {filteredCharacters.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </div>
            {!searchTriggered && (
              <Pagination 
                currentPage={page} 
                totalPages={totalPages} 
                onPageChange={handlePageChange} 
              />
            )}
            {searchTriggered && filteredCharacters.length > 0 && (
              <div className="has-text-centered mt-4">
                <p className="has-text-white is-size-5">
                  Mostrando {filteredCharacters.length} resultado(s) de {allCharacters.length}
                </p>
                <button 
                  className="button is-small is-danger mt-2"
                  onClick={handleClearFilters}
                >
                  Ver todos los personajes
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Characters;
