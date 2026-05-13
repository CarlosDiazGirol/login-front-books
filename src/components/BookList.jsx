function BookList({ books, isDeletingId, isLoading, onDelete }) {
  return (
    <section className="block">
      <h2>BookList</h2>

      {isLoading ? (
        <div className="simple-box">
          <p>Cargando libros...</p>
        </div>
      ) : books.length === 0 ? (
        <div className="simple-box">
          <p>No hay libros todavia.</p>
        </div>
      ) : (
        <div className="book-list">
          {books.map((book) => (
            <article className="book-item" key={book.id}>
              {book.imageUrl ? <img alt={book.title} className="book-image" src={book.imageUrl} /> : null}

              <div className="book-item-head">
                <h3>{book.title}</h3>
                <button
                  className="delete-button"
                  disabled={isDeletingId === book.id}
                  onClick={() => onDelete(book.id)}
                  type="button"
                >
                  X
                </button>
              </div>
              <p>Autor: {book.author || 'Desconocido'}</p>
              <p>Pais: {book.country || 'Desconocido'}</p>
              <p>Idioma: {book.language || 'Desconocido'}</p>
              <p>Paginas: {book.pages || 0}</p>
              <p>Año: {book.year || 'Sin dato'}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default BookList