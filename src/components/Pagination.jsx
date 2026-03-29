function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <nav className="pagination is-centered" role="navigation" aria-label="pagination">
      <a
        className={`pagination-previous ${currentPage === 1 ? 'is-disabled' : ''}`}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        style={{ cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
      >
        Anterior
      </a>
      <a
        className={`pagination-next ${currentPage === totalPages ? 'is-disabled' : ''}`}
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        style={{ cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
      >
        Siguiente
      </a>
      <ul className="pagination-list">
        {getPageNumbers().map((page) => (
          <li key={page}>
            <a
              className={`pagination-link ${page === currentPage ? 'is-current' : ''}`}
              onClick={() => onPageChange(page)}
              style={{ cursor: 'pointer' }}
            >
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
