import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransformations, setPage } from '../store/slices/transformationsSlice';
import TransformationCard from '../components/TransformationCard';
import Loading from '../components/Loading';
import Error from '../components/Error';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';

function Transformations() {
  const dispatch = useDispatch();
  const { items, loading, error, page, totalPages } = useSelector((state) => state.transformations);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchTransformations(page));
  }, [dispatch, page]);

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredTransformations = items.filter((trans) =>
    trans.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trans.character?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div className="section">
      <div className="container">
        <h1 className="title has-text-white">Transformaciones</h1>
        
        <div className="search-section">
          <SearchBar 
            searchTerm={searchTerm} 
            onSearchChange={setSearchTerm} 
            placeholder="Buscar transformacion o personaje..." 
          />
        </div>

        {filteredTransformations.length === 0 ? (
          <div className="has-text-centered">
            <p className="has-text-white title is-4">No se encontraron transformaciones</p>
          </div>
        ) : (
          <>
            <div className="columns is-multiline">
              {filteredTransformations.map((transformation) => (
                <TransformationCard key={transformation.id} transformation={transformation} />
              ))}
            </div>
            <Pagination 
              currentPage={page} 
              totalPages={totalPages} 
              onPageChange={handlePageChange} 
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Transformations;
