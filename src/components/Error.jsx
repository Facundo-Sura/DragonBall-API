function Error({ message }) {
  return (
    <div className="error-container">
      <div className="notification is-danger is-light">
        <p className="title is-4 has-text-danger">Ocurrio un Error</p>
        <p>{message || 'No se pudieron cargar los datos. Por favor, intenta de nuevo.'}</p>
      </div>
    </div>
  );
}

export default Error;
